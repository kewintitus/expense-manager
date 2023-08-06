import Transaction from '@/models/transactions';
import { connectToDb } from '@/utils/database';

const getTransactionMetrics = async (req, { params }) => {
  const fromDate = req.nextUrl.searchParams.get('fromDate');
  const toDate = req.nextUrl.searchParams.get('toDate');
  console.log(new Date(fromDate), new Date(toDate));
  const aggregation = [
    {
      $match: {
        user: params.email,
        transactionDate: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      },
    },
    {
      $group: {
        _id: '$transactionType',
        sum: {
          $sum: '$transactionAmount',
        },
      },
    },
  ];
  try {
    await connectToDb();
    let transactionMetrics;
    if (params.email) {
      if (fromDate && toDate) {
        transactionMetrics = await Transaction.aggregate(aggregation);
      } else {
        throw new Error('From and To dates required');
      }
    } else {
      throw new Error('user must be logged in');
    }
    return new Response(JSON.stringify(transactionMetrics));
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 400 })
    );
  }
};

export { getTransactionMetrics as GET };
