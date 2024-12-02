import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";



const containerbehind={

}

const buttonStyles = {
  padding: '10px 20px',
  marginTop:'40px',
  width:'200px',
  margin:'auto',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: 'green',
  color: '#fff',
  cursor: 'pointer',
   zindex:'1'
};
const fileInputStyles = {
  marginTop: '150px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  margin:'auto',
  width:'250px',
 
  
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
  gridColumn: 'span 2', 
  width: '150px',
  marginLeft:'150px',

};
const containerStyles = {
  padding: '20px',
  maxWidth: '800px',
  border:'solid',
  borderRadius:'10px',
  paddingBottom:'40px',
  margin: '0 auto',
  fontFamily: 'Arial, sans-serif',
  zindex:'1'
};
const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};
const rowStyles = {
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
};
const inputStyles = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  flex: 1,
};
const AddResData = () => {
  const [formData, setFormData] = useState({
    Respondents: "",
    age: "",
    sex: "",
    Ethnic: "",
    academic_perfromance: "",
    adamemic_description: "",
    IQ: "",
    type_school: "",
    socio_economic_status: "",
    Study_Habit: "",
    NAT_Results: "",
  });

  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "NAT"), {
        ...formData,
        age: Number(formData.age),
        academic_perfromance: Number(formData.academic_perfromance),
        NAT_Results: Number(formData.NAT_Results),
      });
      alert("Data added successfully!");
      setFormData({
        Respondents: "",
        age: "",
        sex: "",
        Ethnic: "",
        academic_perfromance: "",
        adamemic_description: "",
        IQ: "",
        type_school: "",
        socio_economic_status: "",
        Study_Habit: "",
        NAT_Results: ""
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  
  const handleFileUpload = async () => {
    if (!csvFile) {
      alert("Please select a CSV file to upload.");
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const rows = text.split('\n').slice(1);
      const batchData = [];

      rows.forEach((row) => {
        const columns = row.split(',');
        if (columns.length >= 10) {
          batchData.push({
            Respondents: columns[0].trim(),
            age: Number(columns[1].trim()),
            sex: columns[2].trim(),
            Ethnic: columns[3].trim(),
            academic_perfromance: Number(columns[4].trim()),
            adamemic_description: columns[5].trim(),
            IQ: columns[6].trim(),
            type_school: columns[7].trim(),
            socio_economic_status: columns[8].trim(),
            Study_Habit: columns[9].trim(),
            NAT_Results: Number(columns[10].trim()),
          });
        }
      });

      try {
        for (let data of batchData) {
          await addDoc(collection(db, "NAT"), data);
        }
        alert('CSV data uploaded successfully!');
      } catch (error) {
        console.error('Error uploading CSV data:', error);
        alert('Failed to upload CSV data. Please try again.');
      } finally {
        setLoading(false);
        setCsvFile(null);
      }
    };

    reader.readAsText(csvFile);
  };

  return (
    <div style={containerStyles}>
      <h2>Add NAT Data</h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        <div style={rowStyles}>
          <input
            type="text"
            placeholder="First Name"
            value={formData.FirstName}
            onChange={(e) => setFormData({ ...formData, FirstName: e.target.value })}
            required
            style={inputStyles}
          />
          <input
            type="text"
            placeholder="Respondents Name"
            value={formData.Respondents}
            onChange={(e) => setFormData({ ...formData, Respondents: e.target.value })}
            required
            style={inputStyles}
          />
        </div>
        <div style={rowStyles}>
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            required
            style={inputStyles}
          />
          <input
            type="text"
            placeholder="Sex"
            value={formData.sex}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
            required
            style={inputStyles}
          />
        </div>
        <div style={rowStyles}>
          <input
            type="text"
            placeholder="Ethnic"
            value={formData.Ethnic}
            onChange={(e) => setFormData({ ...formData, Ethnic: e.target.value })}
            required
            style={inputStyles}
          />
          <input
            type="number"
            placeholder="Academic Performance"
            value={formData.academic_perfromance}
            onChange={(e) => setFormData({ ...formData, academic_perfromance: e.target.value })}
            required
            style={inputStyles}
          />
        </div>
        <div style={rowStyles}>
          <input
            type="text"
            placeholder="Academic Description"
            value={formData.adamemic_description}
            onChange={(e) => setFormData({ ...formData, adamemic_description: e.target.value })}
            required
            style={inputStyles}
          />
          <input
            type="text"
            placeholder="IQ"
            value={formData.IQ}
            onChange={(e) => setFormData({ ...formData, IQ: e.target.value })}
            required
            style={inputStyles}
          />
        </div>
        <div style={rowStyles}>
          <input
            type="text"
            placeholder="Type of School"
            value={formData.type_school}
            onChange={(e) => setFormData({ ...formData, type_school: e.target.value })}
            required
            style={inputStyles}
          />
          <input
            type="text"
            placeholder="Socio-Economic Status"
            value={formData.socio_economic_status}
            onChange={(e) => setFormData({ ...formData, socio_economic_status: e.target.value })}
            required
            style={inputStyles}
          />
        </div>
        <div style={rowStyles}>
          <input
            type="text"
            placeholder="Study Habit"
            value={formData.Study_Habit}
            onChange={(e) => setFormData({ ...formData, Study_Habit: e.target.value })}
            required
            style={inputStyles}
          />
          <input
            type="number"
            placeholder="NAT Results"
            value={formData.NAT_Results}
            onChange={(e) => setFormData({ ...formData, NAT_Results: e.target.value })}
            required
            style={inputStyles}
          />
        </div>
        <button type="submit" style={buttonStyles}>Add Data</button>
        <h3 style={{ textAlign: 'center' }}>OR</h3>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={fileInputStyles}
        />
        <button
          onClick={handleFileUpload}
          disabled={loading}
          style={buttonStyles}
        >
          {loading ? 'Uploading...' : 'Upload CSV'}
        </button>
      </form>
    </div>
  );
};

export default AddResData;
