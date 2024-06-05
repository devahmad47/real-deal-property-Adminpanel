// import React from 'react';
// import { useSelector } from 'react-redux';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { selecteUsers  , selectAllActiveUsers} from '../../Store/authSlice';
// const MyGraph = () => {
//     const allUsers = useSelector(selecteUsers); // Assuming 'allUsers' is your state
//     const storeAllActiveUsers = useSelector(selectAllActiveUsers)

//     const data = [];

//     return (
//         <LineChart width={600} height={300} data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="totalUsers" stroke="#8884d8" />
//             <Line type="monotone" dataKey="activeUsers" stroke="#82ca9d" />
//         </LineChart>
//     );
// };

// export default MyGraph;