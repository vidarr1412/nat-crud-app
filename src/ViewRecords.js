import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the import path as necessary
import './ViewRecords.css'; // Import CSS for styling

const ViewRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const recordsCollection = collection(db, 'NAT'); // Ensure this matches your Firestore collection name
        const recordSnapshot = await getDocs(recordsCollection);
        const recordList = recordSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRecords(recordList);
      } catch (error) {
        console.error('Error fetching records: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <div style={loadingStyles}>Loading records...</div>;
  }

  return (
    <div style={containerStyles}>
      <h2 style={headerStyles}>View All Records</h2>
      {records.length === 0 ? (
        <p style={noRecordsStyles}>No records found.</p>
      ) : (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th>Respondents</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Ethnic</th>
              <th>Academic Performance</th>
              <th>Academic Description</th>
              <th>IQ</th>
              <th>Type of School</th>
              <th>Socio-Economic Status</th>
              <th>Study Habit</th>
              <th>NAT Results</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.Respondents}</td>
                <td>{record.age}</td>
                <td>{record.sex}</td>
                <td>{record.Ethnic}</td>
                <td>{record.academic_performance}</td> {/* Corrected spelling */}
                <td>{record.academic_description}</td> {/* Corrected spelling */}
                <td>{record.IQ}</td>
                <td>{record.type_school}</td>
                <td>{record.socio_economic_status}</td>
                <td>{record.Study_Habit}</td>
                <td>{record.NAT_Results}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Styles for the component
const containerStyles = {
  backgroundColor: '#f9f9f9',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  maxWidth: '900px',
  margin: '20px auto',
  transition: 'all 0.3s ease',
};

const headerStyles = {
  textAlign: 'center',
  color: '#333',
  marginBottom: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
};

const loadingStyles = {
  textAlign: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#007bff',
  padding: '50px 0',
};

const noRecordsStyles = {
  textAlign: 'center',
  fontSize: '16px',
  color: '#888',
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

export default ViewRecords;
