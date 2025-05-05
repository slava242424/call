import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCalls } from '../api/api';

const CallsList = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);
        const data = await getCalls();
        setCalls(data);
        setLoading(false);
      } catch (err) {
        setError('Помилка при завантаженні дзвінків: ' + err.message);
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Список дзвінків</h1>
      <Link to="/calls/new" className="button">Додати новий дзвінок</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Дата</th>
            <th>Тип</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {calls.map(call => (
            <tr key={call.id}>
              <td>{call.імя} {call.прізвище}</td>
              <td>{call.дата_час}</td>
              <td>{call.тип_дзвінка}</td>
              <td>{call.статус}</td>
              <td>
                <Link to={`/calls/${call.id}`}>Деталі</Link> |
                <Link to={`/calls/edit/${call.id}`}>Редагувати</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CallsList;
