import Transaction from '@/models/transactions';
import { connectToDb } from '@/utils/database';

const getUserTransactions = async (req, { params }) => {
  try {
    await connectToDb();
    if (params.email) {
      console.log(params.email);
      const userTransactions = await Transaction.find({
        user: params.email,
      });

      return new Response(JSON.stringify(userTransactions), { status: 200 });
    }
  } catch (error) {
    return new Response('Unable to fetch user transactions', { status: 500 });
  }
};

export { getUserTransactions as GET };
