import React, {useState} from 'react';

function UserCreateForm() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const handleSubmit = async (event) => {

        event.preventDefault();


      const user = {

        userName,
        email,
        password,

      };

      try {
        const response = await fetch('http://localhost:8081/user/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                    },
            body: JSON.stringify(user),
                }
    
            );
    
        if (response.ok) {
            const data = await response.json();
            console.log('User created:', data);
        }else {
            console.error('Error creating User');
    
            }
        } catch (error){
            console.log("response 에러 !", error)
        }
    }
    return (
        <div>
            <h2>Create a new User</h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor = "userName">닉네임 : </label>
                    <input
                        type = "text"
                        id = "userName"
                        value = {userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required/>
                </div>
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
                <button type = "submit">회원가입 완료</button>
            </form>
        </div>
    
    )
}



export default UserCreateForm;