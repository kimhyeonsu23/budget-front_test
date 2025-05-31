import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

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


  const filteredData = data.filter(d => d.value > 0);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#F13342', '#FA8042', '#BB8042'];
  const RADIAN = Math.PI / 180;

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


  useEffect(() => {
    console.log("home실행");
    const token = localStorage.getItem('accessToken');
    const storedEmail = localStorage.getItem('email');
    const storedName = localStorage.getItem('userName'); // 추가

    if (!token || !storedEmail) {
      navigate('/');
    } else {
      setEmail(storedEmail);
      setUserName(storedName || ''); // userName이 없으면 빈 문자열

      fetchCurrentWeek();
      fetchKeywordTotalPrice();
    }

  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');

  };


  const fetchCurrentWeek = async () => { // async함수는 promise를 반환하는 함수, await은 promise가 완려될때까지 기다리는 키워드
    try {
      console.log("fetchCurrentWeek 실행");
      const token = localStorage.getItem('accessToken')
      //const token = localStorage.getItem("token"); // 브라우저의 로컬스토리지에서 token이라는 키에 저장된 jwt 토큰값을 꺼내옴.
      //console.log("이것은 토큰입니다" + localStorage.getItem("token"));

      const response = await fetch('http://localhost:8080/statis/getReceipt/calCurrentWeek', {
        method: 'GET',
        headers: { // 헤더에 담은 토큰 값 : authorizaition 헤더의 값은 반드시 Bearer + 토큰
          'Authorization': `Bearer ${token}`,
        },
        //credentials: 'include',   //블로그 보고 한거임.
      });



      if (response.ok) {
        const value = await response.text(); // 숫자 하나만 오는 경우
        setCurrentWeek(Number(value));
        console.log('currentWeek: ', value);
      } else {
        console.error('프론트 : response 에러');
      }
    } catch (error) {
      console.log('프론트 : error in currentWeek!', error);
    }
  };

  const fetchKeywordTotalPrice = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      //const token = localStorage.getItem("token");
      const res = await fetch('http://localhost:8080/statis/getReceipt/calKeywordTotalPrice', {
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



  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-pretendard bg-[#FFFDF7] px-4 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#5C4033] leading-relaxed">
        환영합니다! <br />
        {userName || email}님!
      </h2>

      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-3 bg-[#FFDAD6] text-[#5C4033] font-semibold rounded-xl shadow text-sm sm:text-base"
      >
        로그아웃
      </button>

      <div className="mt-8 text-[#5C4033]">
        <h3 className="text-xl sm:text-2xl font-bold">이번주 소비 금액 :</h3>
        <h3 className="text-lg sm:text-xl">{currentWeek.toLocaleString()} 원</h3>
        <h4 className="mt-4 font-semibold">카테고리 별 소비:</h4>
        <ul className="mt-2 text-base sm:text-lg text-left">
          <li>음식 : {foodExpense.toLocaleString()} 원</li>
          <li>생필품 : {livingExpense.toLocaleString()} 원</li>
          <li>패션/의류 : {fashionExpense.toLocaleString()} 원</li>
          <li>건강 : {healthExpense.toLocaleString()} 원</li>
          <li>투자 : {investmentExpense.toLocaleString()} 원</li>
          <li>교통 : {transportationExpense.toLocaleString()} 원</li>
        </ul>
      </div>

      <div className="mt-10 w-[300px] h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Home;

