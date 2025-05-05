import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav style={styles.sidebar}>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>
          <NavLink 
            to="/" 
            style={({ isActive }) => isActive ? { ...styles.link, ...styles.activeLink } : styles.link}
            end
          >
            Головна
          </NavLink>
        </li>
        <li style={styles.menuItem}>
          <NavLink 
            to="/calls" 
            style={({ isActive }) => isActive ? { ...styles.link, ...styles.activeLink } : styles.link}
          >
            Дзвінки
          </NavLink>
        </li>
        <li style={styles.menuItem}>
          <NavLink 
            to="/clients" 
            style={({ isActive }) => isActive ? { ...styles.link, ...styles.activeLink } : styles.link}
          >
            Клієнти
          </NavLink>
        </li>
        <li style={styles.menuItem}>
          <NavLink 
            to="/requests" 
            style={({ isActive }) => isActive ? { ...styles.link, ...styles.activeLink } : styles.link}
          >
            Запити
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    backgroundColor: '#34495e',
    minHeight: '100%',
    paddingTop: '20px',
    color: 'white',
  },
  menu: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  menuItem: {
    padding: '5px 0',
  },
  link: {
    display: 'block',
    padding: '10px 20px',
    color: 'white',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
  activeLink: {
    backgroundColor: '#2c3e50',
    borderLeft: '4px solid #3498db',
  }
};

export default Sidebar;