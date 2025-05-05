const db = require('../config/db');

// Отримати всіх клієнтів
exports.getAllClients = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clients');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: `Помилка при отриманні списку клієнтів: ${error.message}` });
  }
};

// Отримати клієнта за ID
exports.getClientById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Клієнта не знайдено' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: `Помилка при отриманні даних клієнта: ${error.message}` });
  }
};

// Створити нового клієнта
exports.createClient = async (req, res) => {
  const { імя, прізвище, телефон, email } = req.body;
  
  try {
    const [result] = await db.query(
      'INSERT INTO clients (імя, прізвище, телефон, email) VALUES (?, ?, ?, ?)',
      [імя, прізвище, телефон, email]
    );
    
    res.status(201).json({
      id: result.insertId,
      імя,
      прізвище,
      телефон,
      email
    });
  } catch (error) {
    res.status(500).json({ message: `Помилка при створенні клієнта: ${error.message}` });
  }
};

// Оновити клієнта
exports.updateClient = async (req, res) => {
  const { імя, прізвище, телефон, email } = req.body;
  
  try {
    const [result] = await db.query(
      'UPDATE clients SET імя = ?, прізвище = ?, телефон = ?, email = ? WHERE id = ?',
      [імя, прізвище, телефон, email, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Клієнта не знайдено' });
    }
    
    res.json({ id: req.params.id, імя, прізвище, телефон, email });
  } catch (error) {
    res.status(500).json({ message: `Помилка при оновленні клієнта: ${error.message}` });
  }
};

// Видалити клієнта
exports.deleteClient = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM clients WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Клієнта не знайдено' });
    }
    
    res.json({ message: 'Клієнта успішно видалено' });
  } catch (error) {
    res.status(500).json({ message: `Помилка при видаленні клієнта: ${error.message}` });
  }
};