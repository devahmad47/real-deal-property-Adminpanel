// import { selecteUsers, selectAllActiveUsers } from '../../Store/authSlice';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Line } from 'react-chartjs-2';
// import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Register the components
// Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


// const GraphComponent = () => {
//     const storeUsers = useSelector(selecteUsers)
//     const storeAllActiveUsers = useSelector(selectAllActiveUsers)
//     const [chartData, setchartData] = useState();

//     useEffect(() => {
//         const chatDataG = () => {
//             const chartDataN = {
//                 labels: storeAllActiveUsers.map(user => new Date(user.lastLogin).toLocaleDateString()),
//                 datasets: [
//                     {
//                         label: 'Total Users',
//                         data: storeUsers.map(user => user.YourConnections.length), // You need to replace this with the correct property or data for total users
//                         fill: false,
//                         borderColor: 'blue',
//                     },
//                     {
//                         label: 'Active Users This Week',
//                         data: storeAllActiveUsers.map(user => user.YourConnections.length), // You need to replace this with the correct property or data for active users
//                         fill: false,
//                         borderColor: 'green',
//                     },
//                 ],
//             };
//             setchartData(chartDataN)
//         }

//         if (storeUsers.length > 0 && storeAllActiveUsers.length > 0) {
//             chatDataG()
//         }
//     }, [storeUsers, storeAllActiveUsers])

//     console.log(storeUsers)
//     console.log(storeAllActiveUsers)
//     console.log(chartData)
//     return (
//         <div>
//             <h2>User Data Graph</h2>
//             {chartData && 
//             <div>
               
//                 <Line data={chartData} options={{ responsive: true }} />
//             </div>

//             }
//         </div>
//     );
// };

// export default GraphComponent;


import {  selectAllActiveUsers } from '../../Store/authSlice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
Chart.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

const GraphComponent = () => {
  const storeAllActiveUsers = useSelector(selectAllActiveUsers);
  const [chartData, setChartData] = useState();

  useEffect(() => {
    const prepareChartData = () => {
      const dateCounts = {};
      storeAllActiveUsers.forEach(user => {
        const loginDate = new Date(user.lastLogin).toLocaleDateString();
        dateCounts[loginDate] = (dateCounts[loginDate] || 0) + 1;
      });

      const chartDataN = {
        labels: Object.keys(dateCounts),
        datasets: [
          {
            label: 'Active Users ',
            data: Object.values(dateCounts),
            backgroundColor: 'cyan',
          },
        ],
      };
      setChartData(chartDataN);
    };

    if (storeAllActiveUsers.length > 0) {
      prepareChartData();
    }
  }, [storeAllActiveUsers]);

 

  return (
    <div>
      <h2>User Data Graph</h2>
      {chartData && (
        <div>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

export default GraphComponent;
