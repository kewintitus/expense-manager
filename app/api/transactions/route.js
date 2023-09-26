import Account from '@/models/account';
import DeletedTransaction from '@/models/deletedTransaction';
import Transaction from '@/models/transactions';
import userMetrics from '@/models/userMetrics';
import { connectToDb } from '@/utils/database';

const createNewTransaction = async (req) => {
  try {
    await connectToDb();
    console.log(req.body);
    console.log('INNNNN');
    const body = await req.json();

    let accountName = '';

    if (body.savedata.transactionMode === 'Bank Account') {
      if (
        body.savedata.bankAccountName === '' ||
        body.savedata.bankAccountName === 'Select'
      ) {
        throw new Error('Bank Account Cannot be empty');
      } else {
        accountName = body.savedata.bankAccountName;
        console.log('email', body.email);
        if (body.savedata.transactionType === 'income') {
          const updateAccountBalance = await Account.findOneAndUpdate(
            {
              $and: [{ accountName: accountName }, { user: body.email }],
            },
            {
              $inc: { amount: +Number(body.savedata.transactionAmount) },
            }
          );
        } else {
          const updateAccountBalance = await Account.findOneAndUpdate(
            {
              $and: [{ accountName: accountName }, { user: body.email }],
            },
            {
              $inc: { amount: -Number(body.savedata.transactionAmount) },
            }
          );
          console.log('accountBalanceUP', updateAccountBalance);
        }
      }
    } else if (body.savedata.transactionMode === 'Cash') {
      accountName = 'cash';
      if (body.savedata.transactionType === 'income') {
        const updateAccountBalance = await Account.findOneAndUpdate(
          {
            $and: [{ accountName: accountName }, { user: body.email }],
          },
          {
            $inc: { amount: +Number(body.savedata.transactionAmount) },
          }
        );
      } else {
        const updateAccountBalance = await Account.findOneAndUpdate(
          {
            $and: [{ accountName: accountName }, { user: body.email }],
          },
          {
            $inc: { amount: -Number(body.savedata.transactionAmount) },
          }
        );
        console.log('accountBalanceUP', updateAccountBalance);
      }
    }
    const data = await Transaction.create(body.savedata);
    if (body.savedata.transactionType === 'expense') {
      const updateMetrics = await userMetrics.findOneAndUpdate(
        {
          'user.email': body.email,
        },
        {
          $inc: {
            spending: +body.savedata.transactionAmount,
            balance: -body.savedata.transactionAmount,
          },
        }
        //   { $inc: { balance: body.transactionAmount } },
      );
    } else {
      const updateMetrics = await userMetrics.findOneAndUpdate(
        {
          'user.email': body.email,
        },
        {
          $inc: {
            income: +body.savedata.transactionAmount,
            balance: +body.savedata.transactionAmount,
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: 'data saved successfully' }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        Errormsg: 'Error while saving data',
        error_details:
          error.errors?.user?.message ||
          error.errors?.transactionDate?.message ||
          error?.message,
      }),
      {
        status: 500,
      }
    );
  }
};

const getTransaction = async (req) => {
  try {
    await connectToDb();
    const txnId = req.nextUrl.searchParams.get('txnId');
    if (txnId) {
      const txnData = await Transaction.findById(txnId);
      return new Response(JSON.stringify(txnData), { status: 200 });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Unable to get transactions' }),
      { status: 400 }
    );
  }
};

const updateTransaction = async (req) => {
  try {
    await connectToDb();
    const body = await req.json();

    console.log(body);
    const txnId = body.txnId;
    const orgTxn = await Transaction.findById(body.txnId);
    console.log(orgTxn);
    const prevAmount = Number(orgTxn.transactionAmount);
    const newAmount = Number(body.savedata.transactionAmount);
    const prevBank = orgTxn?.bankAccountName;
    const newBank = body.savedata.bankAccountName;
    const newCategory = String(body.savedata.transactionCategory);
    const newTxnDate = new Date(body.savedata.transactionDate);
    const newTxnNote = body.savedata.transactionNote;
    const newTxnTags = body.savedata.transactionTags;
    const txnType = body.savedata.transactionType;
    console.log(prevAmount, newAmount, prevBank, newBank, newCategory, txnType);

    let metrics;

    // const changeUserMetrics = await userMetrics.find({
    //   'user.email': body.email,
    // });
    // console.log('User Metrics', changeUserMetrics[0]);
    // metrics = changeUserMetrics[0];
    // console.log(metrics, 'metrics');
    const updateValue = newAmount - prevAmount;
    console.log(newAmount - prevAmount);

    if (txnType === 'expense') {
      const updateUserMetrics = await userMetrics.findOneAndUpdate(
        {
          'user.email': body.email,
        },
        {
          $inc: { spending: updateValue, balance: -updateValue },
        }
      );

      const updateTransaction = await Transaction.findByIdAndUpdate(txnId, {
        $set: {
          transactionDate: newTxnDate,
          transactionCategory: String(newCategory),
          transactionAmount: newAmount,
          bankAccountName: newBank,
          transactionNote: newTxnNote,
          transactionTags: newTxnTags,
        },
      });
      console.log(updateTransaction);
    } else if (txnType === 'income') {
      const updateUserMetrics = await userMetrics.findOneAndUpdate(
        {
          'user.email': body.email,
        },
        {
          $inc: { income: updateValue, balance: updateValue },
        }
      );
    }
    const test = await Transaction.findById(String(txnId));
    console.log('before', test);
    const updateTransaction = await Transaction.findByIdAndUpdate(txnId, {
      $set: {
        transactionDate: newTxnDate,
        transactionCategory: String(newCategory),
        transactionAmount: newAmount,
        bankAccountName: newBank,
        transactionNote: newTxnNote,
        transactionTags: newTxnTags,
      },
    });
    const test2 = await Transaction.findById(txnId);
    console.log('after', test2);

    return new Response(
      JSON.stringify({ message: 'Data updated successfully' }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error while updating data' }),
      {
        status: 400,
      }
    );
  }
};

const deleteTransaction = async (req) => {
  try {
    await connectToDb();
    const txnId = req.nextUrl.searchParams.get('txnId');

    // const reqBody = await req.json();
    console.log(txnId);

    const transaction = await Transaction.findById(txnId);

    if (transaction?.transactionMode === 'Bank Account') {
      if (transaction?.transactionType === 'expense') {
        const updateAccountBalance = await Account.findOneAndUpdate(
          {
            $and: [
              { accountName: transaction?.bankAccountName },
              { user: transaction?.user },
            ],
          },
          {
            $inc: { amount: +Number(transaction.transactionAmount) },
          }
        );
        console.log(updateAccountBalance);
        const updateMetrics = await userMetrics.findOneAndUpdate(
          {
            'user.email': transaction.user,
          },
          {
            $inc: {
              spending: -transaction.transactionAmount,
              balance: +Number(transaction.transactionAmount),
            },
          }
          //   { $inc: { balance: body.transactionAmount } },
        );
      } else if (transaction?.transactionType === 'income') {
        const updateAccountBalance = await Account.findOneAndUpdate(
          {
            $and: [
              { accountName: transaction?.bankAccountName },
              { user: transaction?.user },
            ],
          },
          {
            $inc: { amount: -Number(transaction.transactionAmount) },
          }
        );
      }

      // const updateMetrics = await userMetrics.findOneAndUpdate(
      //   {
      //     'user.email': transaction.user,
      //   },
      //   {
      //     $inc: {
      //       income: -transaction.transactionAmount,
      //       balance: -transaction.transactionAmount,
      //     },
      //   }
      //   //   { $inc: { balance: body.transactionAmount } },
      // );

      // await Transaction.deleteOne({ _id: txnId });
    } else if (transaction?.transactionMode === 'Cash') {
      if (transaction.transactionType === 'income') {
        const updateAccountBalance = await Account.findOneAndUpdate(
          {
            $and: [{ accountName: 'cash' }, { user: transaction.user }],
          },
          {
            $inc: { amount: -Number(transaction.transactionAmount) },
          }
        );

        const updateMetrics = await userMetrics.findOneAndUpdate(
          {
            'user.email': transaction.user,
          },
          {
            $inc: {
              income: -transaction.transactionAmount,
              balance: -transaction.transactionAmount,
            },
          }
          //   { $inc: { balance: body.transactionAmount } },
        );
      } else {
        const updateAccountBalance = await Account.findOneAndUpdate(
          {
            $and: [{ accountName: 'cash' }, { user: transaction.user }],
          },
          {
            $inc: { amount: +Number(transaction.transactionAmount) },
          }
        );
        const updateMetrics = await userMetrics.findOneAndUpdate(
          {
            'user.email': transaction.user,
          },
          {
            $inc: {
              spending: -Number(transaction.transactionAmount),
              balance: +Number(transaction.transactionAmount),
            },
          }
          //   { $inc: { balance: body.transactionAmount } },
        );
      }
    }

    const deleted = await DeletedTransaction.create({
      transactionType: transaction.transactionType,
      transactionDate: transaction.transactionDate,
      transactionCategory: transaction.transactionCategory,
      transactionMode: transaction?.transactionMode,
      bankAccountName: transaction?.bankAccountName,
      transactionAmount: transaction?.transactionAmount,
      transactionNote: transaction?.transactionNote,
      transactionTags: transaction?.transactionTags,
      user: transaction?.user,
      deletedOn: new Date(),
    });
    await Transaction.deleteOne({ _id: txnId });

    console.log(deleted);
    // console.log({ ...transaction, deletedOn: new Date() });

    return new Response(
      JSON.stringify({ message: 'Transaction Deleted successfully' }),
      { status: 202 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error while deleting data' }),
      {
        status: 400,
      }
    );
  }
};
export {
  createNewTransaction as POST,
  getTransaction as GET,
  updateTransaction as PATCH,
  deleteTransaction as DELETE,
};
