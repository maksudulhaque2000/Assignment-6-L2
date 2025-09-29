import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummyData = [
  { name: 'Jan', rides: 400 },
  { name: 'Feb', rides: 300 },
  { name: 'Mar', rides: 500 },
  { name: 'Apr', rides: 450 },
  { name: 'May', rides: 600 },
];

const AnalyticsChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-96">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dummyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rides" fill="#8884d8" />
            </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;