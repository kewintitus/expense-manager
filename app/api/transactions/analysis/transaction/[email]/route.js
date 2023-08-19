const { default: Transaction } = require('@/models/transactions');
const { connectToDb } = require('@/utils/database');

const getTransactionTrendData = async (req, { params }) => {
  const fromDate = req.nextUrl.searchParams.get('fromDate');
  const toDate = req.nextUrl.searchParams.get('toDate');
  const txnType = req.nextUrl.searchParams.get('txnType');
  const aggrType = req.nextUrl.searchParams.get('aggrType');

  const yearlyAggregation = [
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
          monthNo: {
            $month: '$transactionDate',
          },
          month: {
            $let: {
              vars: {
                monthsInString: [
                  '',
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
              },
              in: {
                $arrayElemAt: [
                  '$$monthsInString',
                  {
                    $month: '$transactionDate',
                  },
                ],
              },
            },
          },
        },
        value: {
          $sum: '$transactionAmount',
        },
      },
    },
    {
      $sort: {
        '_id.monthNo': 1,
      },
    },
  ];

  const monthlyAggregation = [
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
      $project: {
        value: '$transactionAmount',
        date: '$transactionDate',
        dateFormatted: {
          $dateToString: {
            format: '%d-%m',
            date: '$transactionDate',
          },
        },
      },
    },
    {
      $group: {
        _id: '$dateFormatted',
        date: {
          $first: '$date',
        },
        index: {
          $first: {
            $dateToString: {
              format: '%d',
              date: '$date',
            },
          },
        },
        value: {
          $sum: '$value',
        },
      },
    },
    {
      $sort: {
        date: 1,
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
      if (!aggrType) {
        throw new Error('Aggregation Type is required');
      }
      if (aggrType === 'monthly') {
        const dailyTrend = await Transaction.aggregate(monthlyAggregation);
        return new Response(JSON.stringify(dailyTrend), { status: 200 });
      } else if (aggrType === 'yearly') {
        const yearlyTrend = await Transaction.aggregate(yearlyAggregation);
        return new Response(JSON.stringify(yearlyTrend), { status: 200 });
      } else {
        throw new Error('Invalid Type');
      }
    } else {
      throw new Error('User must be logged in');
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 400 })
    );
  }
};

export { getTransactionTrendData as GET };
