import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRequests } from '../api/api'; // функція для отримання запитів

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const requestsData = await getRequests();
        setRequests(requestsData);
        setLoading(false);
      } catch (err) {
        setError('Помилка при завантаженні запитів: ' + err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div>
      <h1>Список запитів</h1>
      <Link to="/requests/new" className="button">Додати новий запит</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Клієнт</th>
            <th>Тип запиту</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.імя} {request.прізвище}</td>
              <td>{request.тип_запиту}</td>
              <td>{request.статус}</td>
              <td>
                <Link to={`/requests/${request.id}`}>Деталі</Link>
                {' | '}
                <Link to={`/requests/edit/${request.id}`}>Редагувати</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsList;
