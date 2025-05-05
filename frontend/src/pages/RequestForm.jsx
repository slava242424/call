import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRequest, updateRequest, getRequestById } from '../api/api';

const RequestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [імя, setІмя] = useState('');
  const [прізвище, setПрізвище] = useState('');
  const [тип_запиту, setТипЗапиту] = useState('');
  const [статус, setСтатус] = useState('');
  const [опис, setОпис] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchRequest = async () => {
        setLoading(true);
        try {
          const request = await getRequestById(id);
          setІмя(request.імя);
          setПрізвище(request.прізвище);
          setТипЗапиту(request.тип_запиту);
          setСтатус(request.статус);
          setОпис(request.опис);
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };

      fetchRequest();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateRequest({ id, імя, прізвище, тип_запиту, статус, опис });
      } else {
        await createRequest({ імя, прізвище, тип_запиту, статус, опис });
      }
      setLoading(false);
      navigate('/requests');
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{id ? 'Редагувати запит' : 'Додати новий запит'}</h1>
      <form onSubmit={handleSubmit}>
        <label>Ім'я:</label>
        <input type="text" value={імя} onChange={(e) => setІмя(e.target.value)} required />

        <label>Прізвище:</label>
        <input type="text" value={прізвище} onChange={(e) => setПрізвище(e.target.value)} required />

        <label>Тип запиту:</label>
        <input type="text" value={тип_запиту} onChange={(e) => setТипЗапиту(e.target.value)} required />

        <label>Статус:</label>
        <input type="text" value={статус} onChange={(e) => setСтатус(e.target.value)} required />

        <label>Опис:</label>
        <textarea value={опис} onChange={(e) => setОпис(e.target.value)} required></textarea>

        <button type="submit" disabled={loading}>
          {loading ? 'Завантаження...' : 'Зберегти'}
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
