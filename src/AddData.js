import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const containerStyles = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '700px',
  margin: '200px auto 20px auto',
};

const formStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '15px',
  alignItems: 'center',
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
  gridColumn: 'span 2', // Make the upload button span two columns
};

const AddResData = () => {
  const [formData, setFormData] = useState({
    Respondents: "",
    age: "",
    sex: "",
    Ethnic: "",
    academic_performance: "",
    academic_description: "",
    IQ: "",
    type_school: "",
    socio_economic_status: "",
    Study_Habit: "",
    NAT_Results: "",
  });

  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle CSV file selection
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "NAT_RESULT"), {
        ...formData,
        age: Number(formData.age),
        academic_performance: Number(formData.academic_performance),
        NAT_Results: Number(formData.NAT_Results),
      });
      alert("Data added successfully!");
      setFormData({
        Respondents: "",
        age: "",
        sex: "",
        Ethnic: "",
        academic_performance: "",
        academic_description: "",
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

  // Handle CSV upload
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
        if (columns.length >= 5) {
          batchData.push({
            Respondents: columns[0].trim(),
            age: Number(columns[1].trim()),
            sex: columns[2].trim(),
            Ethnic: columns[3].trim(),
            academic_performance: Number(columns[4].trim()),
            academic_description: columns[5].trim(),
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
          await addDoc(collection(db, "NAT_RESULT"), data);
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
        <input
          type="text"
          placeholder="Respondents Name"
          value={formData.Respondents}
          onChange={(e) => setFormData({ ...formData, Respondents: e.target.value })}
          required
          style={inputStyles}
        />
        <input
          type="number"
          placeholder="Respondents Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
          style={{ ...inputStyles, width: '100px' }} // Small input for age
        />
        <input
          type="text"
          placeholder="Sex"
          value={formData.sex}
          onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
          required
          style={{ ...inputStyles, width: '150px' }} // Medium input for sex
        />
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
          value={formData.academic_performance}
          onChange={(e) => setFormData({ ...formData, academic_performance: e.target.value })}
          required
          style={{ ...inputStyles, width: '100px' }} // Small input for performance
        />
        <input
          type="text"
          placeholder="Academic Description"
          value={formData.academic_description}
          onChange={(e) => setFormData({ ...formData, academic_description: e.target.value })}
          required
          style={inputStyles}
        />
        <input
          type="text"
          placeholder="IQ"
          value={formData.IQ}
          onChange={(e) => setFormData({ ...formData, IQ: e.target.value })}
          required
          style={{ ...inputStyles, width: '100px' }} // Small input for IQ
        />
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
          style={{ ...inputStyles, width: '100px' }} // Small input for results
        />
        <button type="submit" style={submitButtonStyles}>
          Add Data
        </button>
        <h3 style={{ gridColumn: 'span 2', textAlign: 'center' }}>OR</h3>
        <input type="file" accept=".csv" onChange={handleFileChange} style={{ gridColumn: 'span 2' }} />
        <button onClick={handleFileUpload} disabled={loading} style={uploadButtonStyles}>
          {loading ? 'Uploading...' : 'Upload CSV'}
        </button>
      </form>
    </div>
  );
};

export default AddResData;
