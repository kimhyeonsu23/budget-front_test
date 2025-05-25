/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

// export default App
// */
// // src/App.jsx
// import React from 'react';
// import './App.css';
// import UserCreateForm from './components/UserCreateForm';  // 방금 만든 UserForm 컴포넌트 임포트

// function App() {
//     return (
//         <div className="App">
//             <h1>Welcome to the Budget App</h1>
//             <UserCreateForm />  {/* StatisticForm 컴포넌트 추가 */}
//         </div>
//     );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeForm from './components/HomeForm';
import UserCreateForm from './components/UserCreateForm';
import ReceiptCreateForm from './components/ReceiptCreateForm';
import LoginForm from './components/LoginForm';


function App() {

  const linkStyle = {
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none'
  };


  return (
    <Router>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/user/createUser" style={linkStyle}>회원가입</Link>
        <Link to="/receipt/createRecipt" style={linkStyle}>영수증 등록</Link>
        <Link to="/user/login" style={linkStyle}>로그인</Link>
      </div>

      <Routes>
        <Route path="/HomeForm" element={<HomeForm />} />
        <Route path="/user/createUser" element={<UserCreateForm />} />
        <Route path="receipt/createRecipt" element={<ReceiptCreateForm />} />
        <Route path="user/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;