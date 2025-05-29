import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


function HomeForm() {

  // React 상태값.
  const [currentWeek, setCurrentWeek] = useState(0);
  const [foodExpense, setFoodExpense] = useState(0);
  const [livingExpense, setLivingExpense] = useState(0);
  const [fashionExpense, setFashionExpense] = useState(0);
  const [healthExpense, setHealthExpense] = useState(0);
  const [investmentExpense, setInvestmentExpense] = useState(0);
  const [transportationExpense, setTransportationExpense] = useState(0);

  // PieChart는 [{ name : 항목명, value : 값 }] 형태의 배열이 필요함.
  const data = [
    { name: '외식', value: foodExpense },
    { name: '생필품/생활비', value: livingExpense },
    { name: '패션/미용/의류', value: fashionExpense },
    { name: '건강/병원비', value: healthExpense },
    { name: '저축/투자', value: investmentExpense },
    { name: '교통', value: transportationExpense },
  ];

  // data 객체 배열에서 value 값이 0보다 큰 항목만 골라낸 새 배열을 만듦 : .filter() : 배열 안의 값들을 하나씩 검사해서 참을 반환하는 것만 새 배열에 포함.
  const filteredData = data.filter(d => d.value > 0);

  // 파이 조각의 색상.
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#F13342', '#FA8042', '#BB8042'];
  const RADIAN = Math.PI / 180;

  // pieChart 함수 : 파이 조각 내부에 텍스트를 표시하는 라벨 함수.
  // cx, cy : 원 중심의 x, y 좌표 /  midAngle : 해당 파이 조각의 중심 각도
  // innerRadius : 파이 안쪽 반지름 /  outerRadius : 파이 바깥쪽 반지름.
  // index : 조각 순서.
  const pieChart = ({   // 커스텀 라벨 함수.
    cx, cy, midAngle, innerRadius, outerRadius, name, percent, index,
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
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };


  // promise : 아직 완료되지 않았지만 미래에 완려될 수도 있는 작업을 표현하는 자바스크립트 객체.
  // 처음 화면이 열릴 떄(마운트 시) 백엔드에 요청을 보냄.
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


// 함수를 동시에 실행하고 둘 다 끝날 때까지 기다리는 코드.
    const run = async () => {    // async : 비동기 함수 선언. 이 함수 안에서 await을 사용할 수 있음.
      await Promise.all([fetchCurrentWeek(), fetchKeywordTotalPrice()]); // async function으로 정의된 함수는 promise 객체를 반환함.(결과가 나중에 도착한다는 약속)
    };    // Promise.all([a,b]) : a, b라는 두개의 비동리 작업을 동시에 실행하고 둘다 끝날 때까지 기다린 뒤에 다음 코드를 실행함. 순서 상관없이 두개가 모두 완료되어야 넘어감.


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
      <div style={{ width: 600, height: 600 }}>
        <ResponsiveContainer width="100%" height="100%"> {/* ResponsiveContainer : 부모 크기에 맞게 자동 반응형 설정 */}
          <PieChart>
            <Pie
              data={filteredData}
              cx="60%" // 전체 width / height 의 퍼센트에서 결정됨,
              cy="50%"
              labelLine={false}

              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}

              outerRadius={120}
              fill="#8884d8"

              dataKey="value"
            >
              {/*  // filteredData 배열의 각 항목에 대햇 cell이라는 파이 조각을 하나씩 만들어서 지정된 색을 입힌다는 뜻 */}
              {filteredData.map((entry, index) => ( // entry : 배열의 현재 요소 (키 값 쌍 객체), index : 현재 몇번째요소인지 나타내는 숫자(0부터 시작)
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))} {/*리액트에서 리스트를 반복해서 렌더링 할 때는 key를 줘야 함. 각 항목이 고유하다는 걸 리액트가 추적할 수 있도록 하기 위해서. */}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HomeForm;

// ResponsiveContainer : 부모 크기에 맞게 자동 반응형 설정
// pieChart : 파이 차트를 감싸는 최상위 컴포넌트
// pie : 실제 파이 조각을 만드는 컴포넌트
// data : 시각화할 데이터
// dataKey = "value" : 어떤 필드를 기준으로 파이 조각 크기를 계산할지.
// labelLine : true면 선으로 연결된 라벨
// label : true면 기본 라벨, 함수라면 커스텀 라벨
// Cell : 각 조각 하나하나에 색상 부여
// toLocaleString() : 숫자를 1,234,567 이런 식으로 콤마를 찍어줌.
// dataKey : 어떤 값을 기준으로 파이 크기를 결정할지 지정.

// useEffect(() => {  // 1. 컴포넌트 화면에 처음 나타날때(마운트),   2. 의존성 배열 안의 값이 바뀔때
//    }, [의존성]);  : 콜백 함수(이 안에 부수효과 코드 작성, fetch...), 의존성 배열[] : 특정 값이 바뀔 때만 다시 실행, 빈 배열이면 최초 한번만 실행