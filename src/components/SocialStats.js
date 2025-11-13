"use client";
import { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SocialStats() {
  const [data, setData] = useState(null);

  useEffect(()=>{
    async function fetchStats(){
      try {
        const res = await fetch('/project-2025/fine-dine/spin-win-pro/api/social');
        if(!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    }
    fetchStats();
  }, []);

  if(!data) return <div>Loading...</div>;

  const chartData = {
    labels: ['Google', 'Tripadvisor', 'Instagram (followers)'],
    datasets: [
      {
        label: 'Rating / Followers',
        data: [
          data.google.rating,
          data.tripadvisor.rating,
          data.instagram.followers
        ],
        backgroundColor: ['#ea4335', '#00a680', '#3b82f6']
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Bar data={chartData} options={options} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Google</div>
          <div className="font-bold">{data.google.rating} ⭐</div>
          <div className="text-xs text-gray-600">{data.google.reviews} reviews</div>
        </div>
        <div className="p-3 bg-white rounded shadow">
          <div className="text-sm text-gray-500">TripAdvisor</div>
          <div className="font-bold">{data.tripadvisor.rating} ⭐</div>
          <div className="text-xs text-gray-600">{data.tripadvisor.reviews} reviews</div>
        </div>
        <div className="p-3 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Instagram</div>
          <div className="font-bold">{data.instagram.followers.toLocaleString()}</div>
          <div className="text-xs text-gray-600">{data.instagram.posts} posts</div>
        </div>
      </div>
    </div>
  );
}