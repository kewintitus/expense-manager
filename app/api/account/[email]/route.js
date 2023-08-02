import Account from '@/models/account';
import userMetrics from '@/models/userMetrics';
import { connectToDb } from '@/utils/database';
import { ObjectId } from 'mongodb';
// var ObjectId = require('mongoose');

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

    const id = req.nextUrl.searchParams.get('id');
    console.log(id);

    if (id) {
      const userAccount = await Account.findById(id);
      return new Response(JSON.stringify({ data: userAccount }), {
        status: 200,
      });
    } else {
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
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: 'Error while fetching user accounts' })
    );
  }
};

const editAccount = async (req, { params }) => {
  try {
    await connectToDb();
    const body = await req.json();
    console.log(body);

    const existingData = await Account.findById(body.id);
    console.log('existing', existingData);
    // if (existingData.accountName === body.data.accountName) {
    //   console.log('same name');

    // const update = await Account.aggregate([
    //   {
    //     $match: {
    //       _id: new ObjectId(body.id),
    //     },
    //   },
    //   {
    //     $set: {
    //       amount: Number(body.data.amount),
    //     },
    //   },
    //   {
    //     $set: {
    //       accountName: body.data.accountName,
    //     },
    //   },
    // ]);

    const update = await Account.findByIdAndUpdate(body.id, {
      $set: { accountName: body.data.accountName, amount: body.data.amount },
      // $set: { amount: body.data.amount },
    });

    const toInc = Number(body.data.amount) - Number(existingData.amount);
    console.log('amt', toInc);
    const updateBalance = await userMetrics.findOneAndUpdate(
      {
        'user.email': params?.email,
      },
      { $inc: { balance: toInc } }
      // { balance: { $inc: toInc } }
    );

    console.log('found', update);
    console.log('found', updateBalance);
    // const updateBalance = await userMetrics.findOneAndUpdate(
    //   {
    //     'user.email': params?.email,
    //   },
    //   { $inc: Number(body.amount) - Number(existingData.amount) }
    // );
    //   const updateBalance = await userMetrics.findOneAndUpdate(
    //     {
    //       'user.email': params?.email,
    //     },
    //     { $inc: Number(body.amount) - Number(existingData.amount) }
    //   );
    // } else if (existingData.amount === body.data.amount) {
    //   const update = await Account.updateOne(
    //     { _id: ObjectId(body.id) },
    //     { accountName: body.data.accountName }
    //   );
    // }
    // console.log('current', updateBalance);

    return new Response(JSON.stringify({ data: body }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 400 });
  }
};

export { createNewAccount as POST, getAccounts as GET, editAccount as PUT };
