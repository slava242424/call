const db = require('../config/db');

// Отримати всі дзвінки
exports.getAllCalls = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, cl.імя, cl.прізвище 
      FROM calls c 
      JOIN clients cl ON c.client_id = cl.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: `Помилка при отриманні списку дзвінків: ${error.message}` });
  }
};

// Отримати дзвінок за ID
exports.getCallById = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, cl.імя, cl.прізвище 
      FROM calls c 
      JOIN clients cl ON c.client_id = cl.id 
      WHERE c.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Дзвінок не знайдено' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: `Помилка при отриманні даних дзвінка: ${error.message}` });
  }
};

// Створити новий дзвінок
exports.createCall = async (req, res) => {
  const { client_id, дата_час, тривалість, тип_дзвінка, статус, оператор_id } = req.body;
  
  try {
    const [result] = await db.query(
      'INSERT INTO calls (client_id, дата_час, тривалість, тип_дзвінка, статус, оператор_id) VALUES (?, ?, ?, ?, ?, ?)',
      [client_id, дата_час, тривалість, тип_дзвінка, статус, оператор_id]
    );
    
    res.status(201).json({
      id: result.insertId,
      client_id,
      дата_час,
      тривалість,
      тип_дзвінка,
      статус,
      оператор_id
    });
  } catch (error) {
    res.status(500).json({ message: `Помилка при створенні дзвінка: ${error.message}` });
  }
};

// Оновити дзвінок
exports.updateCall = async (req, res) => {
  const { client_id, дата_час, тривалість, тип_дзвінка, статус, оператор_id } = req.body;
  
  try {
    const [result] = await db.query(
      'UPDATE calls SET client_id = ?, дата_час = ?, тривалість = ?, тип_дзвінка = ?, статус = ?, оператор_id = ? WHERE id = ?',
      [client_id, дата_час, тривалість, тип_дзвінка, статус, оператор_id, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Дзвінок не знайдено' });
    }
    
    res.json({ 
      id: req.params.id, 
      client_id, 
      дата_час, 
      тривалість, 
      тип_дзвінка, 
      статус, 
      оператор_id 
    });
  } catch (error) {
    res.status(500).json({ message: `Помилка при оновленні дзвінка: ${error.message}` });
  }
};

// Видалити дзвінок
exports.deleteCall = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM calls WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Дзвінок не знайдено' });
    }
    
    res.json({ message: 'Дзвінок успішно видалено' });
  } catch (error) {
    res.status(500).json({ message: `Помилка при видаленні дзвінка: ${error.message}` });
  }
};