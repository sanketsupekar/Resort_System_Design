import React,{useState,useEffect} from 'react'; 
import NavBar from './NavBar';
import "../styles/admin-styles/BarChart.css";
import Header from '../components/Header';
import { Bar, Doughnut,Pie } from 'react-chartjs-2'; 
import {Chart as ChartJS,BarElement,LinearScale,CategoryScale, ArcElement,Legend, Tooltip} from "chart.js";
import { fetchGetAPI } from "../components/UserFunctions";
import { API_ADMIN_getMonthlyStatistics } from "../api/index";
import { API_ADMIN_getOnlineBookedStatistics } from "../api/index";
ChartJS.register(
  BarElement,
  LinearScale,
  ArcElement,CategoryScale,
  Tooltip,
  Legend
)

function MonthlyBarChart() { 

  const [monthNumber, setMonthNumber] = useState([]);
  const [bookingCount, setbookingCount] = useState([]);
  const [chart,setChart] = useState([]);
  const [roomName, setRoomName] = useState([]);
  const [bookAmount, setBookAmount] = useState([]);
  
  const [barchart,setbarChart] = useState([]);

  const [loading, setLoading] = useState(false);
    
  const data = { 
    labels: monthNumber, 
    datasets: [ 
      { 
        label: "Monthly Booking Rooms Count ", 
        data: bookingCount, 
        backgroundColor: [ 
          "rgba(255, 99, 132, 0.6)", 
          "rgba(54, 162, 235, 0.6)", 
          "rgba(255, 206, 86, 0.6)", 
          "rgba(75, 192, 192, 0.6)", 
          "rgba(153, 102, 255, 0.6)", 
          "rgba(255, 159, 64, 0.6)", 
        ], 
        borderColor: [ 
          "rgba(255, 99, 132, 1)", 
          "rgba(54, 162, 235, 1)", 
          "rgba(255, 206, 86, 1)", 
          "rgba(75, 192, 192, 1)", 
          "rgba(153, 102, 255, 1)", 
          "rgba(255, 159, 64, 1)", 
        ],  
        borderWidth: 1, 
      }, 
    ], 
  }; 
  const bardata = { 
    labels:roomName, 
    datasets: [ 
      { 
        label: 'roomName', 
        data: bookAmount, 
        backgroundColor: [ 
          "rgba(255, 99, 132, 0.6)", 
          "rgba(54, 162, 235, 0.6)", 
          "rgba(255, 206, 86, 0.6)", 
          "rgba(75, 192, 192, 0.6)", 
          "rgba(153, 102, 255, 0.6)", 
          "rgba(255, 159, 64, 0.6)", 
        ], 
        borderColor: [ 
          "rgba(255, 99, 132, 1)", 
          "rgba(54, 162, 235, 1)", 
          "rgba(255, 206, 86, 1)", 
          "rgba(75, 192, 192, 1)", 
          "rgba(153, 102, 255, 1)", 
          "rgba(255, 159, 64, 1)", 
        ], 
        borderWidth: 2, 
      }, 
    ], 
  }; 
 
  const options = { 
    scales: { 
      y: { 
        beginAtZero: true, 
      }, 
     
    }, 
    plugins: { 
      Legend: { 
        display: true, 
        position: "right", // Adjust the legend position as needed 
      }, 
      tooltips: { 
        enabled: true, 
      }, 
    },
  }; 
  

  useEffect(() => {
    console.log("STat")
    getMonthlyStatistics();
  }, []);
  async function getMonthlyStatistics() {
   setLoading(true);
   const respones = await fetchGetAPI(API_ADMIN_getMonthlyStatistics);
   const json = await respones.json();
   setChart(json);
   console.log(json)
   
   const monthNumber = json.map((item) => item.month);
   // console.log(roomName);
   setMonthNumber(monthNumber);
   const bookingCount = json.map((item) => item.count
   );
   // console.log(bookAmount);
   setbookingCount(bookingCount);
   
   
 
 }
 async function getBookingStatistics() {
  setLoading(true);
  const respones = await fetchGetAPI(API_ADMIN_getOnlineBookedStatistics);
  const json = await respones.json();
  setbarChart(json);
  
  const roomName = json.map((item) => item.roomName);
  // console.log(roomName);
  setRoomName(roomName);
  const bookAmount = json.map((item) => item.totalBookingAmount
  );
  // console.log(bookAmount);
  setBookAmount(bookAmount);
  

}


useEffect(() => {
  getBookingStatistics();
}, []);
  return ( 
    <>
    <NavBar/>
    <Header/>
    <center>
    <div className='barcontainer'>
    <div className='chart-container'> 
       <Doughnut data={data} options={options} /> 
       <figcaption className='fig'>Monthly Statistics for Room</figcaption> 
     </div>
  
     <div  className='chart-container1'> 
      <Pie data={bardata} options={options} /> 
      <figcaption className='fig'>Statistics for Room</figcaption> 
    </div>
 </div>
   </center>
     </>
  ); 
} 
 
export default MonthlyBarChart;