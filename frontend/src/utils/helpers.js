export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };
  
  export const getStatusStyle = (status) => {
    switch (status) {
      case 'новий':
        return { color: 'blue' };
      case 'в обробці':
        return { color: 'orange' };
      case 'завершений':
        return { color: 'green' };
      default:
        return { color: 'gray' };
    }
  };
  