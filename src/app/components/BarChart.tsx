"use client";

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[]; // Ensure labels are initialized as an empty array
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const BarChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [], // Initialize labels as an empty array
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState<ChartOptions<'bar'>>({});

  // Fetch the chart data from the API
  const fetchChartData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard'); // Proxy route in Next.js
      const data = await response.json();

      // Log the fetched data to inspect its structure
      console.log('Fetched Data:', data);

      // Check if data.daily and data.daily.chartData exist before using them
      if (!data || !data.daily || !data.daily.chartData) {
        throw new Error('Data structure is incorrect');
      }

      const labels = data.daily.chartData.map((item: { timestamp: string }) =>
        new Date(item.timestamp).toLocaleTimeString() // Adjust this based on your preferred label format
      );
      const values = data.daily.chartData.map((item: { count: number }) => item.count);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'User Activity',
            data: values,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.4)',
          },
        ],
      });

      setChartOptions({
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'User Activity Over Time', // Adjust title based on your needs
          },
        },
        maintainAspectRatio: false,
        responsive: true,
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []); // Empty dependency array to only run on component mount

  return (
    <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
