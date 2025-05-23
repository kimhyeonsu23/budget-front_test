import React, {useState} from 'react';

function LoginForm() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const handleSubmit = async (event) => {

        event.preventDefault();


      const user = {

        email,
        password,

      };

      try {
        const response = await fetch('http://localhost:8081/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                    },
            body: JSON.stringify(user),
                }
    
            );
    
        if (response.ok) {
            const data = await response.json();
            console.log('User login:', data);
            localStorage.setItem("token", data.token); // 토큰을 로컬 스토리지에 저장해야 함.
            // 이후 다른 api요청을 보낼 때 authorization 헤더에 그 토큰을 자동으로 껴줄 수 있음.
        }else {
            console.error('Error login User');
    
            }
        } catch (error){
            console.log("response 에러 !", error)
        }
    }
    return (
        <div>
            <h2>User Login</h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor = "email">이메일 : </label>
                    <input
                        type = "email"
                        id = "email"
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                </div>
                
                <div>
                    <label htmlFor = "password">비밀번호 : </label>
                    <input
                        type = "password"
                        id = "password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        required/>
                </div>
                <button type = "submit">로그인 완료</button>
            </form>
        </div>
    
    )
}



export default LoginForm;