import React, { useEffect, useState } from 'react';
import { db, collection, getDocs } from './firebase';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './NatAnalytics.css'; // Import CSS file for additional styling

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const NatAnalytics = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const iqMapping = {
    high: 1,
    low: 2,
    average: 3
  };
  const studyMap={
    excellent:1,
    good:2,
    poor:3

    
  };
  const schoolMap={
    private:1,
    public:2
    
  };
  const academic_des={
    outstanding :1,
    satisfactory: 2,
    didnotmeetexpectation:3,
    fairlysatisfactory:4,
    verysatisfactory:5
  };
  // Prepare the data for the scatter plots
  const recordList = {
    datasets: [
      {
        label: 'Academic Performance vs Age',
        data: records.map(item => ({
          x: item.age,
          y: item.academic_perfromance
        })),
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        pointStyle: 'triangle', // Set the point shape to triangle
        pointRadius: 5 // You can adjust the size of the triangle here
      },
      {
        label: 'Age vs IQ',
        data: records.map(item => ({
            x: item.age,
          y: iqMapping[item.IQ.toLowerCase()] || 0
        })),
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        pointStyle: 'circle', // Set the point shape to circle
        pointRadius: 5 // You can adjust the size of the circle here
      },
      {
        label: 'Type of School vs NAT Results',
        data: records.map(item => ({
           
          
          y: schoolMap[item.type_school.toLowerCase()] || 0,
          x: item.NAT_Results
        })),
        backgroundColor: 'rgba(255,223,0,1)', // Light yellow
        borderColor: 'rgba(255,165,0,1)',     // Dark yellow (gold)
        borderWidth: 1,
        pointStyle: 'star', // Set the point shape to circle
        pointRadius: 5 // You can adjust the size of the circle here
      },
      {
        label: ' Study Habit Vs NAT Results',
        data: records.map(item => ({
            x: studyMap[item.Study_Habit.toLowerCase()] || 0,
            y: item.NAT_Results
        
        })),
        backgroundColor: 'rgba(255,223,0,1)', // Light yellow
        borderColor: 'rgba(255,165,0,1)',     // Dark yellow (gold)
        borderWidth: 1,
        pointStyle: 'cross', // Set the point shape to circle
        pointRadius: 5 // You can adjust the size of the circle here
      }
      ,
      {
        label: 'Academic Performance vs NAT Result',
        data: records.map(item => ({
            x: item.academic_perfromance,
          y: item.NAT_Results
        })),
        backgroundColor: 'rgba(255,223,0,1)', // Light yellow
        borderColor: 'rgba(255,165,0,1)',     // Dark yellow (gold)
        borderWidth: 1,
        pointStyle: 'crossRot', // Set the point shape to circle
        pointRadius: 5 // You can adjust the size of the circle here
      }
      ,
      {
        label: 'Academic Description vs NAT Result',
        data: records.map(item => ({
            x: academic_des[item.adamemic_description.toLowerCase().replace(/\s+/g, '')
            ] || 0,

          y: item.NAT_Results
        })),
        backgroundColor: 'rgba(255,223,0,1)', // Light yellow
        borderColor: 'rgba(255,165,0,1)',     // Dark yellow (gold)
        borderWidth: 1,
        pointStyle: 'rect', // Set the point shape to circle
        pointRadius: 5 // You can adjust the size of the circle here
      }
    ]
  };

  return (
    <div className="nat-analytics-container">
      <h2 className="page-title">Scatter Plot of Academic Performance</h2>
   

      {loading ? (
        <div className="loader">Loading...</div>  // Simple loader while data is fetching
      ) : (
        <div className="chart-container">
          <Scatter data={recordList} />
        </div>
      )}
    </div>
  );
};

export default NatAnalytics;
