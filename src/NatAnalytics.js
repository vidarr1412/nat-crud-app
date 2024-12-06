import React, { useEffect, useState } from 'react';
import { db, collection, getDocs } from './firebase';
import { Scatter, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './NatAnalytics.css'; // Import CSS file for additional styling

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

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
          x: item.NAT_Results,
          y: schoolMap[item.type_school.toLowerCase()] || 0, // Mapping school type
          typeLabel: schoolMap[item.type_school.toLowerCase()] === 1 ? 'Private' : 'Public', // Custom label
        })),
        backgroundColor: 'rgba(255,223,0,1)', // Light yellow
        borderColor: 'rgba(255,165,0,1)',     // Dark yellow (gold)
        borderWidth: 1,
        pointStyle: 'star', // Set the point shape to star
        pointRadius: 5 // Adjust the size of the star here
      }
    
      
      
      /*
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
      ,*/
      ,{
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
      /*,
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
        */
    ]
  };const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'X-Axis Label' // Default placeholder; will be updated based on dataset
        }
      },
      y: {
        title: {
          display: true,
          text: 'Y-Axis Label' // Default placeholder; will be updated based on dataset
        },
        ticks: {
          callback: function(value, index, values) {
            const dataset = this.chart.data.datasets[index];
            if (!dataset) return value; // Safety check
  
            // Dynamic callback based on dataset label
            if (dataset.label === 'Type of School vs NAT Results') {
              return value === 1 ? 'Private School' : 'Public School';
            } else if (dataset.label === 'Age vs IQ') {
              return value === 1 ? 'High' : value === 2 ? 'Low' : 'Average';
            }
            // Return the value as is for other datasets
            return value;
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const datasetLabel = tooltipItem.dataset ? tooltipItem.dataset.label : ''; // Safety check
            if (!datasetLabel) return ''; // If label is not found, return empty string
  
            // Handle tooltips dynamically based on dataset
            if (datasetLabel === 'Type of School vs NAT Results') {
              const typeLabel = tooltipItem.raw.y === 1 ? 'Private School' : 'Public School';
              return `${typeLabel} , ${tooltipItem.raw.x}`;
            } else if (datasetLabel === 'Age vs IQ') {
              const iqLabel = tooltipItem.raw.y === 1 ? 'High' : tooltipItem.raw.y === 2 ? 'Low' : 'Average';
              return `${tooltipItem.raw.x} , ${iqLabel}`;
            } else if (datasetLabel === 'Academic Performance vs Age') {
              return `Age: ${tooltipItem.raw.x}, Performance: ${tooltipItem.raw.y}`;
            } else if (datasetLabel === 'Academic Performance vs NAT Result') {
              return `Performance: ${tooltipItem.raw.x}, NAT Result: ${tooltipItem.raw.y}`;
            }
            // Default label for other datasets
            return `${tooltipItem.raw.x}, ${tooltipItem.raw.y}`;
          }
        }
      }
    },
    // Dynamically set axis labels based on dataset label
    onBeforeDraw: function(chart) {
      const firstDataset = chart.data.datasets[0];
      if (!firstDataset) return;
  
      chart.options.scales.x.title.text = firstDataset.label.includes('vs') ? 'NAT Results' : 'Age';
      chart.options.scales.y.title.text = firstDataset.label.includes('Performance') ? 'Performance' : 'Type of School';
    }
  };
  
  const groupedData = records.reduce((acc, record) => {
    const age = record.age;
    const iq = record.NAT_Results;

    if (!acc[age]) {
      acc[age] = { totalIQ: 0, count: 0 };
    }

    acc[age].totalIQ += iq;
    acc[age].count += 1;

    return acc;
  }, {});
  const barChartData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: 'Average IQ by Age',
        data: Object.values(groupedData).map((group) => group.totalIQ / group.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average IQ Levels by Age',
      },
    },
  };
  return (
    <div className="nat-analytics-container">
      <h2 className="page-title">Dashboard</h2>
   

      {loading ? (
        <div className="loader">Loading...</div>  // Simple loader while data is fetching
      ) : (
        
        <div className="chart-container">
           
           <div className="item_1">
            <Scatter data={recordList} options={options} />
          </div>
        
         <div className="item_2">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
      
        </div>
        
        
      )}
    </div>
  );
};

export default NatAnalytics;
