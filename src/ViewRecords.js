import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import './ViewRecords.css';
import Modal from './Modal';
import { FaSearch, FaSortUp, FaSortDown } from 'react-icons/fa';

const ViewRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [editingRecord, setEditingRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const recordsCollection = collection(db, 'NAT');
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'NAT', id));
      setRecords(records.filter((record) => record.id !== id));
    } catch (error) {
      console.error('Error deleting record: ', error);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, 'NAT', editingRecord.id), editingRecord);
      setRecords(records.map((record) => (record.id === editingRecord.id ? editingRecord : record)));
      setIsModalOpen(false);
      setEditingRecord(null);
    } catch (error) {
      console.error('Error updating record: ', error);
    }
  };

  const handleSort = (field) => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);

    const sortedRecords = [...records].sort((a, b) => {
      if (direction === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setRecords(sortedRecords);
  };

  const filteredRecords = records.filter((record) =>
    Object.values(record)
      .join(' ')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div style={loadingStyles}>Loading records...</div>;
  }

  return (
    <div style={containerStyles}>
      <h2 style={headerStyles}>National Achievement Test Results</h2>
      <div style={searchContainerStyles}>
        <FaSearch style={searchIconStyles} />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyles}
        />
      </div>
      {filteredRecords.length === 0 ? (
        <p style={noRecordsStyles}>No records found.</p>
      ) : (
        <table style={tableStyles}>
          <thead>
            <tr>
            <th onClick={() => handleSort('First Name Name')}>
                First Name {sortField === 'First Name Name' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('Respondents')}>
                Sur Name {sortField === 'Respondents' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
             
              <th onClick={() => handleSort('age')}>
                Age {sortField === 'age' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('sex')}>
                Sex {sortField === 'sex' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('Ethnic')}>
                Ethnic {sortField === 'Ethnic' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('academic_perfromance')}>
                Academic Performance {sortField === 'academic_perfromance' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('adamemic_description')}>
                Academic Description {sortField === 'adamemic_description' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('IQ')}>
                IQ {sortField === 'IQ' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('type_school')}>
                Type of School {sortField === 'type_school' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('socio_economic_status')}>
                Socio-Economic Status {sortField === 'socio_economic_status' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('Study_Habit')}>
                Study Habit {sortField === 'Study_Habit' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort('NAT_Results')}>
                NAT Results {sortField === 'NAT_Results' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.FirstName}</td>
                <td>{record.Respondents}</td>
                <td>{record.age}</td>
                <td>{record.sex}</td>
                <td>{record.Ethnic}</td>
                <td>{record.academic_perfromance}</td>
                <td>{record.adamemic_description}</td>
                <td>{record.IQ}</td>
                <td>{record.type_school}</td>
                <td>{record.socio_economic_status}</td>
                <td>{record.Study_Habit}</td>
                <td>{record.NAT_Results}</td>
                <td>
                  <button style={buttonStyles} onClick={() => handleEdit(record)}>Edit</button>
                  <button style={deleteButtonStyles} onClick={() => handleDelete(record.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleUpdate}
        record={editingRecord}
        setRecord={setEditingRecord}
      />
    </div>
  );
};

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '20px',
  minHeight: '100vh',
};

const loadingStyles = {
  textAlign: 'center',
  fontSize: '20px',
};

const headerStyles = {
  textAlign: 'center',
  marginBottom: '20px',
};

const searchContainerStyles = {
  position: 'relative',
  marginBottom: '20px',
  marginRight:'580px'
};

const searchIconStyles = {
  position: 'absolute',
  top: '30px',
  left: '10px',
  transform: 'translateY(-50%)',
  color: '#007bff',
};

const searchInputStyles = {
  width: '500px',
  padding: '10px 10px 10px 40px',
  marginBottom: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const noRecordsStyles = {
  textAlign: 'center',
  fontSize: '18px',
};

const tableStyles = {
  width: '800px',
  borderCollapse: 'collapse',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const buttonStyles = {
  padding: '8px 12px',
  marginRight: '5px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const deleteButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#dc3545',
  marginTop:'20px',
};

export default ViewRecords;
