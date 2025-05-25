import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {

    const navigate = useNavigate();  // ✅ 컴포넌트 함수 안에 있어야 함!

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = { email, password };

        try {
            const response = await fetch('http://localhost:8081/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User login:', data);
                localStorage.setItem("token", data.token);
                console.log('로그인 성공 : 로그인 폼');
                navigate('/HomeForm');  // ✅ 이게 작동하려면 Route도 잘 연결되어 있어야 함
            } else {
                console.error('Error login User');
            }
        } catch (error) {
            console.log("response 에러 !", error);
        }
    }

    return (
        <div>
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">이메일 : </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="password">비밀번호 : </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">로그인 완료</button>
            </form>
        </div>
    );
}

export default LoginForm;
