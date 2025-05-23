// src/components/Statistic.jsx
// 일단 이 폼을 호출하면 토큰에 담긴 유저의 아이디로 영수증이 그려짐.

import { LineChart, Line, XAxis } from 'recharts';

const token = localStorage.getItem("toke");

const response = await fetch("http://localhost:8090/statis", {

  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "applicaiton/json"
  }
// 내생각이지만 토큰에 담아서 보냄
});

// data는 객체 배열(json array of objects) json 형태가 맞음)
const data = [
  { name: '외식', price: 70 },
  { name: '생필품/생활비', price: 40 },
  { name: '패션/미용/의류', price: 90 },
  { name: '건강/병원비', price: 30 },
  { name: '저축/투자', price: 35 },
  { name: '교통', price: 25 },
];

function Statistic() {

  const renderLineChart = (
    <LineChart width={600} height={200} data={data}>
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
      <XAxis dataKey="name" />
    </LineChart>

  );

  return (
    <div>
      <h2>통계 그래프</h2>
      {renderLineChart} {/* 여기서 렌더링 */}
    </div>
  );
}

export default Statistic;
