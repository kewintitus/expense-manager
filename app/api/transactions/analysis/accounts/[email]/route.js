const { default: Transaction } = require('@/models/transactions');
const { connectToDb } = require('@/utils/database');

const getAccountMetrics = async (req, { params }) => {
  const fromDate = req.nextUrl.searchParams.get('fromDate');
  const toDate = req.nextUrl.searchParams.get('toDate');
  const txnType = req.nextUrl.searchParams.get('txnType');

  const aggregation = [
    {
      $match: {
        transactionType: txnType,
        transactionDate: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      },
    },
    {
      $group: {
        _id: {
          $cond: {
            if: {
              $eq: ['$bankAccountName', ''],
            },
            then: 'Cash',
            else: '$bankAccountName',
          },
        },
        value: {
          $sum: '$transactionAmount',
        },
      },
    },
  ];

  try {
    await connectToDb();
    if (params?.email) {
      if (!fromDate || !toDate) {
        throw new Error('from and to dates are required');
      }
      if (!txnType) {
        throw new Error('Type of transaction is required');
      }
      const accountData = await Transaction.aggregate(aggregation);
      return new Response(JSON.stringify(accountData), { status: 200 });
    } else {
      throw new Error('User must be logged in');
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 400 })
    );
  }
};

export { getAccountMetrics as GET };
