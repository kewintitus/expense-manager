import Account from '@/models/account';
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
    return new Response(JSON.stringify({ message: 'Success' }), {
      status: 200,
    });
  } catch (error) {}
};

export {
  createNewTransaction as POST,
  getTransaction as GET,
  updateTransaction as PATCH,
};
