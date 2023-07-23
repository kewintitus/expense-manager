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

    // console.log(req.nextUrl.searchParams.get('fromDate'));
    // console.log(req.nextUrl.searchParams.get('toDate'));
    console.log(fromDate, toDate, sortOrder);
    if (params.email) {
      console.log(params);

      if (fromDate && toDate) {
        console.log('HOooo');
        const userMonthlyTransactions = await Transaction.aggregate([
          {
            $match: {
              user: 'kewintitus@gmail.com',
            },
          },
          {
            $match: {
              transactionDate: {
                $gte: new Date('Sun, 04 Jun 2023 14:13:00 GMT'),
                $lte: new Date('Fri, 01 Sep 2023 13:49:00 GMT'),
              },
            },
          },
          {
            $sort: {
              transactionDate: -1,
            },
          },
        ]);

        return new Response(JSON.stringify(userMonthlyTransactions), {
          status: 200,
        });
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
