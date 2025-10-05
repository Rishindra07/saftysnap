import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsPage() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      const labelsRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/images/labels/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      const data = {};
      for (let label of labelsRes.data.labels) {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/images?limit=1000&offset=0&label=${label}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        data[label] = res.data.items.length;
      }
      setCounts(data);
    };
    fetchAll();
  }, []);

  const chartData = {
    labels: Object.keys(counts),
    datasets: [{
      label: "Detections Count",
      data: Object.values(counts),
      backgroundColor: ["#B22222","#FFA500","#00FF00","#1E90FF"]
    }]
  };

  return (
    <div style={{padding:"20px", textAlign:"center"}}>
      <h2 style={{marginBottom:"30px", color:"#2d3748", fontSize:"28px"}}>Analytics</h2>
      <div style={{maxWidth:"800px", margin:"0 auto", background:"white", padding:"30px", borderRadius:"12px", boxShadow:"0 4px 6px rgba(0,0,0,0.1)"}}>
        <h3 style={{color:"#2d3748", marginBottom:"20px", fontSize:"20px"}}>Detection Statistics</h3>
        <Bar 
          data={chartData} 
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Safety Equipment Detection Count'
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }}
        />
        {Object.keys(counts).length === 0 && (
          <p style={{color:"#718096", fontSize:"16px", marginTop:"20px"}}>
            No data available. Upload some images to see analytics!
          </p>
        )}
      </div>
    </div>
  );
}
