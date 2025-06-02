import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Box, Typography, Button, Stack, Card, Grid } from '@mui/material'

// @mui/aterial : Material UI(MUI)라는 react ui 컴포넌트 라이브러리이며 위 코드는 box, typography, button...불러옴
// Box : HTML의  div와 비슷하지만 스타일 속성을 props로 줄 수 있는 레이아웃 박스
// Typography : 텍스트를 보여줄 때 사용하는 컴포넌트, <h1>, <p>같은거 대신 씀
// Button : 버튼, 클릭이벤트 발생 가능, Stack : 자식 요소를 세로 또는 가로롤 정렬해주는 컨테이너.

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
    { name: '외식', value: foodExpense , img:'🍔'},
    { name: '생필품/생활비', value: livingExpense , img:'🛒'},
    { name: '패션/미용/의류', value: fashionExpense , img:'👕'},
    { name: '건강/병원비', value: healthExpense , img:'🏥'},
    { name: '저축/투자', value: investmentExpense , img:'💴'},
    { name: '교통', value: transportationExpense , img:'🚍'},
  ];


  const filteredData = data.filter(d => d.value > 0);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#F13342', '#FA8042', '#BB8042'];
  const RADIAN = Math.PI / 180;


  useEffect(() => { // 실행시점 : Home의 return이 실행된 뒤에 실행할 함수.
    console.log("home useEffect 실행");
    const token = localStorage.getItem('accessToken');
    const storedEmail = localStorage.getItem('email');
    const storedName = localStorage.getItem('userName'); // 추가

    if (!token || !storedEmail) {
      navigate('/');
    } else {
      setEmail(storedEmail);
      setUserName(storedName || ''); // userName이 없으면 빈 문자열

      // 실행시점 : useEffect()가 실행될때. (비동기 함수이므로 결과가 오면 내부에서 setState()를 호출하고-> setState함수의 특성상 값이 달라지면 -> 다시 렌더링)
      fetchCurrentWeek();
      fetchKeywordTotalPrice();
    }

  }, [navigate]);
  // 만약 의존성 배열이 없다면 아무 조건없이 항상 실행함. 컴포넌트가 렌더링될때마다 매번 실행됨 (첫 렌더링 + 상태가 props가 바뀌면 다시 렌더링 + 렌더링 될때마다 렌더링.)
  // 의존성 배열이 빈배열이라면 딱 한번 최초 마운트 후 렌더링 됨. 


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

<Box
      component="main"
      sx={{
        bgcolor: '#FFFDF7',
        pt: 6,
        pb: 10,
        px: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: 360, md: 600, lg: 800 },
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          환영합니다 ❕<br />
          {userName || email}님❕
        </Typography>
        <Box>
          <div className="mt-8 text-[#5C4033]">

      <Grid container spacing={2} justifyContent="center" > {/* justifyContent : 수평정렬 / alignItems : 수직정렬 */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 4, backgroundColor: '#FFF8F0', boxShadow: 2 }}>
            <Typography variant="h6" font-semibold>💸이번주 소비 금액</Typography>
            <Typography variant="h6">{currentWeek.toLocaleString()} 원</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 4, backgroundColor: '#FFF8F0', boxShadow: 2, fontStyle:'italic'}}>
            <Typography variant="h6" font-semibold>카테고리 소비 금액</Typography>
            <Typography variant="body2">🍔외식: {foodExpense.toLocaleString()} 원</Typography>
            <Typography variant="body2">🛒생활: {livingExpense.toLocaleString()} 원</Typography>
            <Typography variant="body2">👕패션/미용: {fashionExpense.toLocaleString()} 원</Typography>
            <Typography variant="body2">🏥건강: {healthExpense.toLocaleString()} 원</Typography>
            <Typography variant="body2">💴저축/투자: {investmentExpense.toLocaleString()} 원</Typography>
            <Typography variant="body2">🚍교통: {transportationExpense.toLocaleString()} 원</Typography>
          </Card>
        </Grid>
      </Grid>
      </div>
      <Box
  width="100%"
  display="flex"
  justifyContent="center"
  mt={6}
>
  <Card
    sx={{
      width: 400,
      height: 400,
      p: 4,
      backgroundColor: '#FFF8F0',
      boxShadow: 2,
      fontStyle: 'italic',
      position: 'relative',
    }}
  >
    <Typography variant="h6" gutterBottom color="primary">
      📊 카테고리별 소비 분포
    </Typography>

    <Box display="flex" justifyContent="center">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ img, percent }) => `${img}${(percent * 100).toFixed(0)}%`}
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
    </Box>

    <Card
      sx={{
        position: 'absolute',
        bottom: 7,
        right: 7,
        p: 1,
        backgroundColor: '#FFF8F0',
        boxShadow: 2,
        fontStyle: 'italic',
      }}
    >
      <Typography variant="body2">🍔: {foodExpense.toLocaleString()} 원</Typography>
      <Typography variant="body2">🛒: {livingExpense.toLocaleString()} 원</Typography>
      <Typography variant="body2">👕: {fashionExpense.toLocaleString()} 원</Typography>
      <Typography variant="body2">🏥: {healthExpense.toLocaleString()} 원</Typography>
      <Typography variant="body2">💴: {investmentExpense.toLocaleString()} 원</Typography>
      <Typography variant="body2">🚍: {transportationExpense.toLocaleString()} 원</Typography>
    </Card>
  </Card>
</Box>


        </Box>

        <Stack spacing={2} mt={4}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('receipt')}
            sx={{
              bgcolor: '#FFF1F0',
              color: 'primary.main',
              '&:hover': { bgcolor: '#ffeaea' },
            }}
          >
            영수증 등록
          </Button>

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogout}
            sx={{
              bgcolor: '#FFDAD6',
              color: 'primary.main',
              '&:hover': { bgcolor: '#ffcdc0' },
            }}
          >
            로그아웃
          </Button>
        </Stack>
      </Box>
    </Box>






  );
}

export default Home;



{/*  */}