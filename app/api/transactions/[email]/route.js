import Transaction from '@/models/transactions';
import { connectToDb } from '@/utils/database';
// import { useRouter } from 'next/router';
// import { NextApiRequest, NextApiResponse } from 'next';

const getUserTransactions = async (req, { params }) => {
  try {
    await connectToDb();
    // const { sort } = req.query;
    // await console.log('!!!!!!!!!!!!!!!!!!!!!', req.json());
    console.log(params);
    // const router = useRouter();
    const fromDate = req.nextUrl.searchParams.get('fromDate');
    const toDate = req.nextUrl.searchParams.get('toDate');
    const sortOrder = req.nextUrl.searchParams.get('sort') || -1;
    const txnId = req.nextUrl.searchParams.get('txnId');

    // console.log(req.nextUrl.searchParams.get('fromDate'));
    // console.log(req.nextUrl.searchParams.get('toDate'));
    console.log(fromDate, toDate, sortOrder);
    if (params.email) {
      console.log(params);

      if (fromDate && toDate) {
        console.log('Getting monthly user transactions');
        const userMonthlyTransactions = await Transaction.aggregate([
          {
            $match: {
              user: params?.email,
            },
          },
          {
            $match: {
              transactionDate: {
                $gte: new Date(fromDate),

                $lte: new Date(toDate),
              },
            },
          },
          {
            $sort: {
              transactionDate: sortOrder,
            },
          },
        ]);
        console.log(userMonthlyTransactions);

        return new Response(JSON.stringify(userMonthlyTransactions), {
          status: 200,
        });
      }
      if (txnId) {
        const txnId = req.nextUrl.searchParams.get('txnId');
        if (txnId) {
          const txnData = await Transaction.findById(txnId);
          return new Response(JSON.stringify(txnData), { status: 200 });
        }
      }

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
