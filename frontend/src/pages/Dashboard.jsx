// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getCalls, getRequests, getClients } from '../api/api';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalCalls: 0,
    todayCalls: 0,
    pendingRequests: 0,
    totalClients: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const calls = await getCalls();
        const requests = await getRequests();
        const clients = await getClients();

        const todayCalls = calls.filter(call => {
          const today = new Date();
          const callDate = new Date(call.date);
          return callDate.toDateString() === today.toDateString();
        });

        setSummary({
          totalCalls: calls.length,
          todayCalls: todayCalls.length,
          pendingRequests: requests.filter(r => r.status === 'new').length,
          totalClients: clients.length,
        });
      } catch (error) {
        console.error('Помилка при отриманні даних панелі управління', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Панель управління</h1>
      <div>
        <p>Всього дзвінків: {summary.totalCalls}</p>
        <p>Дзвінків сьогодні: {summary.todayCalls}</p>
        <p>Активних запитів: {summary.pendingRequests}</p>
        <p>Всього клієнтів: {summary.totalClients}</p>
      </div>
    </div>
  );
};

export default Dashboard;
