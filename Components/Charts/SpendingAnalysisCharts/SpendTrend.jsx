import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from 'next-themes';

const SpendTrend = ({ startDate, endDate, sessionEmail, analysisType }) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [dataAvailability, setDataAvailability] = useState(true);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const options = {
    scales: {
      y: {
        grid: {
          color: resolvedTheme === 'light' ? '#dee2e6' : '#868e96', // Change x-axis grid color here
        },
      },
      //   x: {
      //     grid: {
      //       color: resolvedTheme === 'light' ? '#dee2e6' : '#868e96',
      //     },
      //   },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const labels = fetchedData.labels;

  const data = {
    labels,
    datasets: [
      {
        label: 'Expense',
        data: fetchedData.values,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      //   {
      //     label: 'Dataset 2',
      //     data: [45, 53, 64, 500, 23, 34, 45, 56, 67, 32, 44, 53, 12],
      //     borderColor: 'rgb(53, 162, 235)',
      //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
      //   },
    ],
  };
  const getSpendTrend = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_APIURL}/api/transactions/analysis/transaction/${sessionEmail}?fromDate=${startDate}&toDate=${endDate}&txnType=expense&aggrType=${analysisType}`
    );
    if (analysisType === 'monthly') {
      const date = new Date(endDate).getDate();
      const month = new Date(endDate).getMonth();
      const labelArr = [];
      const valueArr = [];
      for (let i = 0; i < date; i++) {
        labelArr.push(`${i + 1}-${month + 1}`);
        valueArr.push(0);
      }
      data.data.forEach((el) => {
        valueArr[Number(el.index - 1)] = el.value;
      });
      console.log('SpendTrend', labelArr, valueArr);
      setFetchedData({ labels: labelArr, values: valueArr });
    } else if (analysisType === 'yearly') {
      const labelArr = [
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
      ];
      const valueArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      data.data.forEach((el) => {
        valueArr[el._id.monthNo - 1] = el?.value;
      });
      console.log('yearly', valueArr);
      setFetchedData({ labels: labelArr, values: valueArr });
    }
    console.log('In trend', data.data);
  };
  useEffect(() => {
    getSpendTrend();
    console.log('In Trend', data.data);
  }, [startDate, endDate, sessionEmail, analysisType]);
  return <Line options={options} data={data} />;
};

export default SpendTrend;
