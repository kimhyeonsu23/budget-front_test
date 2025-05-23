import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: '외식', value: 70 },
  { name: '생필품/생활비', value: 40 },
  { name: '패션/미용/의류', value: 90 },
  { name: '건강/병원비', value: 30 },
  { name: '저축/투자', value: 35 },
  { name: '교통', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#F13342','#FA8042', '#BB8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PiechartForm() {
  return (
    <div style = {{width: '100%' , height: 400}}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    </div>
  );
}

export default PiechartForm;



// {
//     render: (args: Record<string, any>) => {
//       const {
//         data,
//         activeShape
//       } = args;
//       return <ResponsiveContainer width="100%" height={400}>
//           <PieChart {...args}>
//             <Pie data={data} dataKey="uv" activeShape={activeShape} />
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>;
//     },
//     args: {
//       data: pageData,
//       activeShape: {
//         fill: 'red'
//       }
//     }
//   }