import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaPlusCircle, FaTable, FaChartLine } from 'react-icons/fa';

const buttonStyles = {
  padding: '12px 20px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s, color 0.3s',
  margin: '10px 0',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const iconStyles = {
  marginRight: '10px',
  fontSize: '25px',
};

const navStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '70px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  backgroundColor: '#ffffff',
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
  zIndex: '100',
  transition: 'width 0.3s ease',
};

const expandedNavStyles = {
  ...navStyles,
  width: '250px',
};

const logoStyles = {
  width: '80px',
  height: '80px',
  marginBottom: '20px',
  borderRadius: '10px',
};

const headerStyles = {
  marginBottom: '20px',
  color: '#00215E',
  fontSize: '24px',
  textAlign: 'center',
  fontWeight: 'bold',
};

const Nav = ({ setActiveTab }) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeTab, setActiveTabState] = useState('home');
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navRef = useRef(null);

  const handleButtonClick = (tab) => {
    setActiveTab(tab);
    setActiveTabState(tab);
  };

  const handleMouseMove = (event) => {
    const navElement = navRef.current;
    const rect = navElement.getBoundingClientRect();
    if (event.clientX <= rect.right && event.clientX >= rect.left - 100) {
      setIsNavVisible(true);
    } else {
      setIsNavVisible(false);
    }
  };

  const handleMouseEnter = () => setIsNavVisible(true);
  const handleMouseLeave = () => setIsNavVisible(false);

  useEffect(() => {
    const navElement = navRef.current;
    document.addEventListener('mousemove', handleMouseMove);
    navElement.addEventListener('mouseenter', handleMouseEnter);
    navElement.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      navElement.removeEventListener('mouseenter', handleMouseEnter);
      navElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <nav ref={navRef} style={isNavVisible ? expandedNavStyles : navStyles}>
      <img
        src="https://png.pngtree.com/template/20190422/ourmid/pngtree-cross-plus-medical-logo-icon-design-template-image_145195.jpg" 
        alt="Logo"
        style={logoStyles}
      />
      {isNavVisible && <h1 style={headerStyles}>NAT</h1>}
      {[
        { name: 'home', icon: <FaHome style={iconStyles} /> },
        { name: 'addRecord', icon: <FaPlusCircle style={iconStyles} /> },
        { name: 'viewRecords', icon: <FaTable style={iconStyles} /> },
        { name: 'viewAnalytics', icon: <FaChartLine style={iconStyles} /> },
      ].map((tab, index) => (
        <button
          key={index}
          style={{
            ...buttonStyles,
            backgroundColor: activeTab === tab.name ? '#004080' : '#00215E',
            color: '#fff',
            ...(hoveredButton === tab.name ? { backgroundColor: '#0066cc', color: '#e0e0e0' } : {}),
          }}
          onMouseEnter={() => setHoveredButton(tab.name)}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => handleButtonClick(tab.name)}
        >
          {tab.icon}
          {isNavVisible && (
            <span style={{ display: isNavVisible ? 'inline' : 'none' }}>
              {tab.name.charAt(0).toUpperCase() + tab.name.slice(1).replace(/([A-Z])/g, ' $1')}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};

export default Nav;
