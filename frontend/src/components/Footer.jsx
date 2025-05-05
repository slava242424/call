import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={styles.footer}>
      <div>
        Інформаційна система "Call-центр" &copy; {currentYear}
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '15px 20px',
    textAlign: 'center',
    fontSize: '0.9rem',
  }
};

export default Footer;

// src/utils/helpers.js
/**
 * Форматування дати у локальний формат
 * @param {string|Date} dateStr - Дата у форматі рядка або об'єкт дати
 * @returns {string} Відформатована дата
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  return date.toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Форматування тривалості у формат ГГ:ХХ:СС
 * @param {number} seconds - Тривалість у секундах
 * @returns {string} Відформатована тривалість
 */
export const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return '';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    remainingSeconds.toString().padStart(2, '0')
  ].join(':');
};

/**
 * Отримати стиль для статусу
 * @param {string} status - Статус
 * @returns {Object} Об'єкт стилів CSS
 */
export const getStatusStyle = (status) => {
  const baseStyle = {
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  };
  
  switch (status) {
    case 'новий':
      return { ...baseStyle, backgroundColor: '#e3f2fd', color: '#1565c0' };
    case 'в обробці':
      return { ...baseStyle, backgroundColor: '#fff8e1', color: '#f57f17' };
    case 'вирішений':
      return { ...baseStyle, backgroundColor: '#e8f5e9', color: '#2e7d32' };
    case 'закритий':
      return { ...baseStyle, backgroundColor: '#eceff1', color: '#546e7a' };
    case 'відкладений':
      return { ...baseStyle, backgroundColor: '#fce4ec', color: '#c2185b' };
    case 'відповідь':
      return { ...baseStyle, backgroundColor: '#e8f5e9', color: '#2e7d32' };
    case 'пропущений':
      return { ...baseStyle, backgroundColor: '#ffebee', color: '#c62828' };
    case 'перенаправлений':
      return { ...baseStyle, backgroundColor: '#e0f7fa', color: '#00838f' };
    case 'завершений':
      return { ...baseStyle, backgroundColor: '#eceff1', color: '#546e7a' };
    default:
      return baseStyle;
  }
};

/**
 * Отримати стиль для пріоритету
 * @param {string} priority - Пріоритет
 * @returns {Object} Об'єкт стилів CSS
 */
export const getPriorityStyle = (priority) => {
  const baseStyle = {
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  };
  
  switch (priority) {
    case 'низький':
      return { ...baseStyle, backgroundColor: '#e8f5e9', color: '#2e7d32' };
    case 'середній':
      return { ...baseStyle, backgroundColor: '#fff8e1', color: '#f57f17' };
    case 'високий':
      return { ...baseStyle, backgroundColor: '#fff3e0', color: '#e65100' };
    case 'критичний':
      return { ...baseStyle, backgroundColor: '#ffebee', color: '#c62828' };
    default:
      return baseStyle;
  }
};