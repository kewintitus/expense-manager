import Transaction from '@/models/transactions';
import userMetrics from '@/models/userMetrics';
import { connectToDb } from '@/utils/database';

const createNewTransaction = async (req) => {
  try {
    await connectToDb();
    console.log(req.body);
    console.log('INNNNN');
    const body = await req.json();

    if (body.savedata.transactionMode === 'Bank Account') {
      if (body.savedata.bankAccount === '') {
        throw new Error('Bank Account Cannot be empty');
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

export { createNewTransaction as POST };
