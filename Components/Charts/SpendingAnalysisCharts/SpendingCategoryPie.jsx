'use client';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const SpendingCategoryPie = ({ startDate, endDate, sessionEmail }) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [dataAvailability, setDataAvailability] = useState(true);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Line Chart',
      // },
    },
  };

  const data = {
    //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    labels: fetchedData.map((data) => {
      console.log(data);
      return data._id;
    }),
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    datasets: [
      {
        label: 'Value in Rs',
        data: fetchedData.map((data) => {
          console.log(data);
          return data.value;
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.9)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  console.log('In PIE CHART', startDate, endDate, sessionEmail);
  const getSpendAccountData = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_APIURL}/api/transactions/analysis/category/${sessionEmail}?fromDate=${startDate}&toDate=${endDate}&txnType=expense`
    );
    console.log('inPIE', data.data);
    setFetchedData(data.data);
    if (data.data.length == 0) {
      setDataAvailability(false);
    } else setDataAvailability(true);
  };
  useEffect(() => {
    getSpendAccountData();
  }, [startDate, endDate, sessionEmail]);

  return (
    <div className="w-full h-full flex justify-center items-center ">
      {dataAvailability ? (
        <Pie options={options} data={data}></Pie>
      ) : (
        <div className="w-full h-full ">Data Not Avaliable</div>
      )}
    </div>
  );
};

export default SpendingCategoryPie;
