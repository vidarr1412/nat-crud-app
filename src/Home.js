import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const containerStyles = {
  backgroundColor: '#ffffff', 
  padding: '20px', 
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
  maxWidth: '600px',
  margin: '200px auto 20px auto',
};

const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px', 
};

const inputStyles = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '16px',
};

const buttonStyles = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s, color 0.3s',
  marginTop: '10px', 
};

const submitButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#00215E', 
    color: '#fff', 
};

const uploadButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#28a745', 
  color: '#fff', 
};

const Home = () => {
}

export default Home;
