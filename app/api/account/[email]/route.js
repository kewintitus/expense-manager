import Account from '@/models/account';
import userMetrics from '@/models/userMetrics';
import { connectToDb } from '@/utils/database';

const createNewAccount = async (req, { params }) => {
  try {
    await connectToDb();
    console.log(req.body);
    console.log(params);
    console.log('FARERE');

    const body = await req.json();
    console.log(body);

    const duplicate = await Account.find({ accountName: body.accountName });
    if (duplicate[0]) {
      console.log(duplicate);
      throw new Error('duplicate account');
    }

    const data = await Account.create(body);

    const updateMetrics = await userMetrics.findOneAndUpdate(
      {
        'user.email': body.user,
      },
      {
        $inc: {
          //   income: +body.amount,
          balance: +Number(body.amount),
        },
      }
    );

    return new Response(
      JSON.stringify(
        JSON.stringify({ message: 'Account created successfully' }),
        { status: 200 }
      )
    );
  } catch (error) {
    console.log(error.message);
    if (error.message === 'duplicate account') {
      console.log('0000');
      return new Response('Account already exists', { status: 500 });
    }
  }
};

const getAccounts = async (req, { params }) => {
  try {
    await connectToDb();

    const bankAccounts = await Account.find({
      $and: [{ user: params?.email }, { accountType: 'bank' }],
    });
    const cashAccount = await Account.find({
      $and: [{ user: params?.email }, { accountType: 'cash' }],
    });

    return new Response(
      JSON.stringify({ data: { bankAccounts, cashAccounts: cashAccount } }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: 'Error while fetching user accounts' })
    );
  }
};

export { createNewAccount as POST, getAccounts as GET };
