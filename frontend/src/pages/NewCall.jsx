import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCall } from '../api/api'; // Імпортуємо функцію для створення дзвінка

const NewCall = () => {
  const [імя, setІмя] = useState('');
  const [прізвище, setПрізвище] = useState('');
  const [тип_дзвінка, setТипДзвінка] = useState('');
  const [статус, setСтатус] = useState('новий');
  const [опис, setОпис] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createCall({ імя, прізвище, тип_дзвінка, статус, опис });
      setLoading(false);
      navigate('/calls');
    } catch (err) {
      setError('Помилка при створенні дзвінка: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Створити новий дзвінок</h1>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ім'я</label>
          <input
            type="text"
            value={імя}
            onChange={(e) => setІмя(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Прізвище</label>
          <input
            type="text"
            value={прізвище}
            onChange={(e) => setПрізвище(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Тип дзвінка</label>
          <input
            type="text"
            value={тип_дзвінка}
            onChange={(e) => setТипДзвінка(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Статус</label>
          <select
            value={статус}
            onChange={(e) => setСтатус(e.target.value)}
          >
            <option value="новий">Новий</option>
            <option value="в обробці">В обробці</option>
            <option value="вирішений">Вирішений</option>
            <option value="закритий">Закритий</option>
          </select>
        </div>
        <div>
          <label>Опис</label>
          <textarea
            value={опис}
            onChange={(e) => setОпис(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Створення...' : 'Створити дзвінок'}
        </button>
      </form>
    </div>
  );
};

export default NewCall;
