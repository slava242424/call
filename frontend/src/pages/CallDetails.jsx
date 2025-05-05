import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCallById } from '../api/api';

const CallDetails = () => {
  const { id } = useParams();
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCallDetails = async () => {
      try {
        setLoading(true);
        const data = await getCallById(id);
        setCall(data);
        setLoading(false);
      } catch (err) {
        setError('Помилка при завантаженні дзвінка: ' + err.message);
        setLoading(false);
      }
    };

    fetchCallDetails();
  }, [id]);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Деталі дзвінка</h1>
      <div>
        <strong>Ім'я:</strong> {call.імя} {call.прізвище}
      </div>
      <div>
        <strong>Дата:</strong> {call.дата_час}
      </div>
      <div>
        <strong>Тип:</strong> {call.тип_дзвінка}
      </div>
      <div>
        <strong>Тривалість(хв):</strong> {call.тривалість}
      </div>
      <div>
        <strong>Статус:</strong> {call.статус}
      </div>
      <div>
        <strong>Опис:</strong> {call.нотатки}
      </div>
    </div>
  );
};

export default CallDetails;
