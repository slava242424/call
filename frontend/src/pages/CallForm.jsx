import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCall, getCallById, updateCall } from '../api/api';

const CallForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [call, setCall] = useState({
    імя: '',
    прізвище: '',
    тип: '',
    статус: '',
    опис: '',
    дата: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCall = async () => {
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
      fetchCall();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCall((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await updateCall(id, call);
      } else {
        await createCall(call);
      }
      setLoading(false);
      navigate('/calls');
    } catch (err) {
      setError('Помилка при збереженні дзвінка: ' + err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Завантаження...</div>;

  return (
    <div>
      <h1>{id ? 'Редагувати дзвінок' : 'Додати новий дзвінок'}</h1>
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}
        <div>
          <label>Ім'я:</label>
          <input
            type="text"
            name="ім'я"
            value={call.імя}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Прізвище:</label>
          <input
            type="text"
            name="прізвище"
            value={call.прізвище}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Тип дзвінка:</label>
          <input
            type="text"
            name="тип"
            value={call.тип_дзвінка}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Тривалість:</label>
          <input
            type="text"
            name="тривалість(хв)"
            value={call.тривалість}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Статус:</label>
          <input
            type="text"
            name="статус"
            value={call.статус}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Опис:</label>
          <textarea
            name="опис"
            value={call.нотатки}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Дата:</label>
          <input
            type="date"
            name="дата"
            value={call.дата_час}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Збереження...' : 'Зберегти'}
        </button>
      </form>
    </div>
  );
};

export default CallForm;
