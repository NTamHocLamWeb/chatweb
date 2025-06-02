import React, { useEffect, useState } from "react";
import { getDashboardData } from "../api/dashboardService";
import { useNavigate } from "react-router-dom";
import { stopNotificationHub, startNotificationHub } from "../hubs/notificationHub";

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  // Load dữ liệu dashboard khi mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Gọi API lấy data dashboard
    getDashboardData(token).then((res) => setData(res));

    // Kết nối hub nhận thông báo
    startNotificationHub(token, (message) => {
      alert("🔔 " + message); // hoặc show toast
    });

    return () => {
      stopNotificationHub(); // cleanup khi rời khỏi trang
    };
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>🎉 Welcome back, {data.name}</h1>

      <div>
        <h2>🔔 Notifications:</h2>
        <ul>
          {data.notifications.map((n, index) => (
            <li key={index}>{n.message}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>📊 Stats</h2>
        <p>Businesses: {data.businessCount}</p>
        <p>Travelers: {data.travelerCount}</p>
      </div>
    </div>
  );
};

export default DashboardPage;
