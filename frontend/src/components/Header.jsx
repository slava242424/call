import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>Інформаційна система "Call-центр"</Link>
      </div>
      <div style={styles.userInfo}>
        <span>Оператор: Марія Іваненко</span>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: '#2c3e50',
    color: 'white',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  logoLink: {
    color: 'white',
    textDecoration: 'none',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  }
};

export default Header;