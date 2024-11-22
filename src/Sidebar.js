import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSmile, FaUsers, FaLaptop, FaLightbulb, FaChartBar, FaRegListAlt } from 'react-icons/fa';

const Sidebar = () => {
  const navItems = [
    { name: 'Screen Time Tracker', path: '/screen-time-tracker', icon: <FaChartBar /> },
    { name: 'Pomodoro', path: '/pomodoro', icon: <FaRegListAlt /> },
    { name: 'Mindfulness', path: '/mindfulness', icon: <FaSmile /> },
    { name: 'Digital Detox', path: '/digital-detox', icon: <FaLaptop /> },
    { name: 'Recommendations', path: '/recommendations', icon: <FaLightbulb /> },
    { name: 'Community', path: '/community', icon: <FaUsers /> },
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Productivity App</h2>
      <ul style={styles.navList}>
        {navItems.map((item, index) => (
          <li key={index} style={styles.navItem}>
            <NavLink 
              to={item.path} 
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? '#1abc9c' : '#ecf0f1',
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
              })}
            >
              {item.icon}
              <span style={styles.navText}>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '20px',
    position: 'fixed',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
  },
  navItem: {
    margin: '5px 0',
  },
  navText: {
    marginLeft: '10px',
  },
};

export default Sidebar;
