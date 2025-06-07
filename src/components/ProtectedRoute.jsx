import React from 'react'
import { Navigate } from 'react-router-dom'
import { Box } from '@mui/material'

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('accessToken')
{/* accessToken이 localStorage에 없으면 "/"로 강제 이동 / 있다면 childeren에 있는 진짜 페이지 컴포넌트를 보여줌. */}
  if (!token) {
    return <Navigate to="/" replace />
  }

  return <Box component="div">{children}</Box>
  {/* childernd은 <ProtectedRoute로 감싸진 자식 컴포넌트가 됨, 이 내부에서는 children이라는 이름으로 사용할 수 있음
      component="div"는 얘를 실제로는 div로 렌더링 하라는 의미. 그렇지만 스타일을 주지 않아서 의미가 없음. 그냥 리턴해도 괜찮음 */}
}
