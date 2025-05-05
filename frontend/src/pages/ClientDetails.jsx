import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClientById } from '../api/api'; // функція для отримання клієнта за ID

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const clientData = await getClientById(id);
        setClient(clientData);
        setLoading(false);
      } catch (err) {
        setError('Помилка при завантаженні клієнта: ' + err.message);
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  if (!client) {
    return <div>Клієнт не знайдений</div>;
  }

  return (
    <div>
      <h1>Деталі клієнта</h1>
      <p><strong>Ім'я:</strong> {client.імя} {client.прізвище}</p>
      <p><strong>Телефон:</strong> {client.телефон}</p>
      <p><strong>Електронна пошта:</strong> {client.email}</p>
    </div>
  );
};

export default ClientDetails;
