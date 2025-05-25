import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


function HomeForm() {

    const [currentWeek, setCurrentWeek] = useState(0);
    const [foodExpense, setFoodExpense] = useState(0);
    const [livingExpense, setLivingExpense] = useState(0);
    const [fashionExpense, setFashionExpense] = useState(0);
    const [healthExpense, setHealthExpense] = useState(0);
    const [investmentExpense, setInvestmentExpense] = useState(0);
    const [transportationExpense, setTransportationExpense] = useState(0);

    const data = [
        { name: '외식', value: foodExpense },
        { name: '생필품/생활비', value: livingExpense },
        { name: '패션/미용/의류', value: fashionExpense },
        { name: '건강/병원비', value: healthExpense },
        { name: '저축/투자', value: investmentExpense },
        { name: '교통', value: transportationExpense },
      ];
      


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#F13342', '#FA8042', '#BB8042'];
    const RADIAN = Math.PI / 180;

    const pieChart = ({
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


    // promise : 아직 완료되지 않았지만 미래에 완려될 수도 있는 작업을 표현하는 자바스크립트 객체.
    useEffect(() => {
        const fetchCurrentWeek = async () => { // async함수는 promise를 반환하는 함수, await은 promise가 완려될때까지 기다리는 키워드
            try {
                const token = localStorage.getItem("token"); // 브라우저의 로컬스토리지에서 token이라는 키에 저장된 jwt 토큰값을 꺼내옴.
                console.log("이것은 토큰입니다" + localStorage.getItem("token"));

                const response = await fetch('http://localhost:8090/statis/getReceipt/calCurrentWeek', {
                    method: 'GET',
                    headers: { // 헤더에 담은 토큰 값 : authorizaition 헤더의 값은 반드시 Bearer + 토큰
                        'Authorization': `Bearer ${token}`,
                    },
                    //credentials: 'include',   //블로그 보고 한거임.
                });



                if (response.ok) {
                    const value = await response.text(); // 숫자 하나만 오는 경우
                    setCurrentWeek(Number(value));
                    console.log('currentWeek:', value);
                } else {
                    console.error('프론트 : response 에러');
                }
            } catch (error) {
                console.log('프론트 : error in currentWeek!', error);
            }
        };

        const fetchKeywordTotalPrice = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch('http://localhost:8090/statis/getReceipt/calKeywordTotalPrice', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (res.ok) {
                    const totalPrice = await res.json();
                    setFoodExpense(totalPrice.food || 0);
                    setLivingExpense(totalPrice.living || 0);
                    setFashionExpense(totalPrice.fashion || 0);
                    setHealthExpense(totalPrice.health || 0);
                    setInvestmentExpense(totalPrice.investment || 0);
                    setTransportationExpense(totalPrice.transportation || 0);
                } else {
                    console.error("프론트 : keyword별 합계 응답 실패.");
                }
            } catch (error) {
                console.error("프론트 : keyword별 합계 fetch 에러", error);
            }
        };

        

        const run = async () => {
            await Promise.all([fetchCurrentWeek(), fetchKeywordTotalPrice()]);
        };
        

        run();

    }, []); // [] 의존성 배열이 비어있어서 마운트시 한번만 실행됨.


    return (
        <div>
            <h2>Login success!</h2>
            <h3>이번주 소비 금액 :</h3>
            <h3>{currentWeek.toLocaleString()} 원</h3>
            <h4>카테고리 별 소비 : </h4>
            <ul>
                <ul>
                    <li>음식 : {foodExpense.toLocaleString()} 원</li>
                    <li>생필품 : {livingExpense.toLocaleString()} 원</li>
                    <li>패션/의류 : {fashionExpense.toLocaleString()} 원</li>
                    <li>건강 : {healthExpense.toLocaleString()} 원</li>
                    <li>투자 : {investmentExpense.toLocaleString()} 원</li>
                    <li>교통 : {transportationExpense.toLocaleString()} 원</li>
                </ul>

            </ul>
            <div style = {{width: '100%' , height: 400}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={pieChart}
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
        </div>
    );
}

export default HomeForm;
