import { useState } from "react"
import './Userlogin.css'
import React, { Component } from "react"
import { useNavigate } from 'react-router-dom'

function Userlogin() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
            navigate('/apppage');
        } else {
            window.alert('登陆失败TAT,账号或密码错误'); // 显示弹窗
        }
    };

    return (
        <>

            <nav className="login">
                <div className="background">
                    <img src="src/assets/back.png" onClick={() => navigate('/')} alt="返回" className="back-image" />
                    <div className="bordered-div">
                        <h1 className="head">(◦˙▽˙◦)</h1>
                        <div className="login-name">
                            <img src="src/assets/login/username.png" alt="User Icon" className="input-icon1" />
                            <input type="text" className="username" placeholder="请输入用户名" value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="login-password">
                            <img src="src/assets/login/password.png" alt="User Icon" className="input-icon2" />
                            <input type="password" className="password" placeholder="请输入密码" value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="login-button">
                            <p>
                                <button className="login-button-style" onClick={handleLogin}> 登录^w^ </button>
                            </p>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="sentence">
                <p >小鼠兴趣圈，汇聚多元热情，点燃无限创意！</p>
            </div>
        </>
    )
}

export default Userlogin