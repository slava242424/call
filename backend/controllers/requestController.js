const db = require('../config/db');

// Отримати всі запити
exports.getAllRequests = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.*, c.імя, c.прізвище 
      FROM requests r 
      JOIN clients c ON r.client_id = c.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: `Помилка при отриманні списку запитів: ${error.message}` });
  }
};

// Отримати запит за ID
exports.getRequestById = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.*, c.імя, c.прізвище 
      FROM requests r 
      JOIN clients c ON r.client_id = c.id 
      WHERE r.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Запит не знайдено' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: `Помилка при отриманні даних запиту: ${error.message}` });
  }
};

// Створити новий запит
exports.createRequest = async (req, res) => {
  const { client_id, call_id, тип_запиту, опис, статус, пріоритет, дата_створення, відповідальний_id } = req.body;
  
  try {
    const [result] = await db.query(
      'INSERT INTO requests (client_id, call_id, тип_запиту, опис, статус, пріоритет, дата_створення, відповідальний_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [client_id, call_id, тип_запиту, опис, статус, пріоритет, дата_створення, відповідальний_id]
    );
    
    res.status(201).json({
      id: result.insertId,
      client_id,
      call_id,
      тип_запиту,
      опис,
      статус,
      пріоритет,
      дата_створення,
      відповідальний_id
    });
  } catch (error) {
    res.status(500).json({ message: `Помилка при створенні запиту: ${error.message}` });
  }
};

// Оновити запит
exports.updateRequest = async (req, res) => {
  const { client_id, call_id, тип_запиту, опис, статус, пріоритет, дата_створення, відповідальний_id } = req.body;
  
  try {
    const [result] = await db.query(
      'UPDATE requests SET client_id = ?, call_id = ?, тип_запиту = ?, опис = ?, статус = ?, пріоритет = ?, дата_створення = ?, відповідальний_id = ? WHERE id = ?',
      [client_id, call_id, тип_запиту, опис, статус, пріоритет, дата_створення, відповідальний_id, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Запит не знайдено' });
    }
    
    res.json({ 
      id: req.params.id, 
      client_id,
      call_id,
      тип_запиту,
      опис,
      статус,
      пріоритет,
      дата_створення,
      відповідальний_id
    });
  } catch (error) {
    res.status(500).json({ message: `Помилка при оновленні запиту: ${error.message}` });
  }
};

// Видалити запит
exports.deleteRequest = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM requests WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Запит не знайдено' });
    }
    
    res.json({ message: 'Запит успішно видалено' });
  } catch (error) {
    res.status(500).json({ message: `Помилка при видаленні запиту: ${error.message}` });
  }
};