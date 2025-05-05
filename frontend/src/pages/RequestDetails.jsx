import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequestById } from '../api/api'; // функція для отримання запиту за ID

const RequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoading(true);
        const requestData = await getRequestById(id);
        setRequest(requestData);
        setLoading(false);
      } catch (err) {
        setError('Помилка при завантаженні запиту: ' + err.message);
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  if (!request) {
    return <div>Запит не знайдено</div>;
  }

  return (
    <div>
      <h1>Деталі запиту</h1>
      <p><strong>Клієнт:</strong> {request.імя} {request.прізвище}</p>
      <p><strong>Тип запиту:</strong> {request.тип_запиту}</p>
      <p><strong>Статус:</strong> {request.статус}</p>
      <p><strong>Опис:</strong> {request.опис}</p>
      <p><strong>Дата створення:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>

      {/* Можливість редагувати запит */}
      <Link to={`/requests/edit/${request.id}`} className="button">
        Редагувати запит
      </Link>
    </div>
  );
};

export default RequestDetails;

