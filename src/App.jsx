import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Box, Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PersonIcon from '@mui/icons-material/Person'

import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Home from './components/Home'
import KakaoCallback from './components/KakaoCallback'
import GoogleCallback from './components/GoogleCallback'
import ConsentPage from './components/ConsentPage'
import ReceiptUpload from './components/ReceiptUpload'
import ProtectedRoute from './components/ProtectedRoute'


function App() { {/* 앱의 뻐대(레이아웃 구조)와 라우팅을 통합하는 역할 + 전체적인 ui 레이아웃 구조도 정의 가능. */}
  return (
    <BrowserRouter> {/* URL을 감지하고 라우팅함. */}
      {/* 전체 화면용 박스 */}
      <Box display="flex" flexDirection="column" minHeight="100vh">
        {/* display="flex" : 자식들을 flex 박스로 배치하겠다는 뜻.
            flexDirection-"column" : 위에서 아래로 배치(세로 정렬)
            minHeight="100vh" : 전체 박스는 화면 높이 100%를 차지, 100% 화면 채움 */}
        {/* ─── 상단 콘텐츠 영역: Container 제거, 폭 100% 유지 ─── */}
        <Box flex="1" sx={{ width: '100%' }}>
          {/* flex = "1" : 남는 공간을 최대한 다 이 영역이 차지하라는 뜻(메인 콘텐츠)
              width: '100%' : 가로는 꽉차제*/}
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />

            {/* 콜백, 동의 페이지 */}
            <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
            <Route path="/oauth/google/callback" element={<GoogleCallback />} />
            <Route
              path="/consent"
              element={
                <ProtectedRoute>
                  <ConsentPage />
                </ProtectedRoute>
              }
            />

            {/* 보호된 홈 & 영수증 업로드 */}
            <Route
              path="/home"
              element={
                <ProtectedRoute> {/* 사용자 설정 (커스텀 컨포넌트) : 로그인된 사용자만 접근할 수 있는 페이지를 보호하는 컴포넌트 */}
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home/receipt"
              element={
                <ProtectedRoute>
                  <ReceiptUpload />
                </ProtectedRoute>
              }
            />

          </Routes>
        </Box>

        {/* 하단 탭바 */}
        <Paper elevation={3}>
          <BottomNav />
        </Paper>
      </Box>
    </BrowserRouter>
  )
}

function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [value, setValue] = useState(location.pathname)

  useEffect(() => {
    setValue(location.pathname)
  }, [location.pathname])

  return (
    <BottomNavigation
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue)
        navigate(newValue)
      }}
      showLabels
    >
      <BottomNavigationAction label="홈" value="/home" icon={<HomeIcon />} />
      <BottomNavigationAction
        label="영수증"
        value="/home/receipt"
        icon={<ReceiptIcon />}
      />
      <BottomNavigationAction
        label="내 정보"
        value="/consent"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  )
}

export default App
