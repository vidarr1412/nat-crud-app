import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import AddResData from './AddData';
import Home from './Home';
import Nav from './Nav';
import ViewRecords from './ViewRecords'; // Import ViewRecords component

const appStyles = {
  backgroundColor: '#f8f9fa', 
  minHeight: '100vh', 
  padding: '20px', 
  fontFamily: 'Arial, sans-serif',   
};

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div style={appStyles}>
      <Nav setActiveTab={setActiveTab} />

      {activeTab === "home" && <Home />}
      {activeTab === "addRecord" && <AddResData />}
      {activeTab === "viewRecords" && <ViewRecords />} {/* Add ViewRecords tab */}

    </div>
  );
};

export default App;
