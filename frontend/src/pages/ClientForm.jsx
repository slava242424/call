import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createClient, updateClient, getClientById } from '../api/api';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [імя, setІмя] = useState('');
  const [прізвище, setПрізвище] = useState('');
  const [телефон, setТелефон] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        setLoading(true);
        try {
          const client = await getClientById(id);
          setІмя(client.імя);
          setПрізвище(client.прізвище);
          setТелефон(client.телефон);
          setEmail(client.email);
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      };

      fetchClient();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateClient({ id, імя, прізвище, телефон, email });
      } else {
        await createClient({ імя, прізвище, телефон, email });
      }
      setLoading(false);
      navigate('/clients');
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{id ? 'Редагувати клієнта' : 'Додати нового клієнта'}</h1>
      <form onSubmit={handleSubmit}>
        <label>Ім'я:</label>
        <input type="text" value={імя} onChange={(e) => setІмя(e.target.value)} required />
        
        <label>Прізвище:</label>
        <input type="text" value={прізвище} onChange={(e) => setПрізвище(e.target.value)} required />

        <label>Телефон:</label>
        <input type="text" value={телефон} onChange={(e) => setТелефон(e.target.value)} required />

        <label>Електронна пошта:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button type="submit" disabled={loading}>{loading ? 'Завантаження...' : 'Зберегти'}</button>
      </form>
    </div>
  );
};

export default ClientForm;
