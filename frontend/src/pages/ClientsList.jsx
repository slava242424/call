import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClients } from '../api/api'; // функція для отримання клієнтів

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const clientsData = await getClients();
        setClients(clientsData);
        setLoading(false);
      } catch (err) {
        setError('Помилка при завантаженні клієнтів: ' + err.message);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div>
      <h1>Список клієнтів</h1>
      <Link to="/clients/new" className="button">Додати нового клієнта</Link>
      <table className="table">
        <thead>
          <tr>
            <th>ПІБ</th>
            <th>Телефон</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.імя} {client.прізвище}</td>
              <td>{client.телефон}</td>
              <td>
                <Link to={`/clients/${client.id}`}>Деталі</Link>
                {' | '}
                <Link to={`/clients/edit/${client.id}`}>Редагувати</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsList;
