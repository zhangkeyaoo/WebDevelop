import './Userlogin.css'
import React, { useState, Component } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Userlogin() {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:7001/api/login', {
                userId,
                password
            }, {
            
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;

            if (data.success) {
                localStorage.setItem('username', data.user.username); // 存储用户名到本地
                localStorage.setItem('userId', data.user.id); // 存储用户ID
                navigate('/apppage');
            } else {
                window.alert('登陆失败TAT,ID或密码错误'); // 显示弹窗
            }
        } catch (error) {
            console.error('Error during login:', error);
        if (error.response) {
            // 服务器响应了一个状态码，且该状态码不在 2xx 范围内
            window.alert(`登陆失败: ${error.response.data.message || '服务器错误'}`);
        } else if (error.request) {
            // 请求已经发出，但没有收到响应
            window.alert('登陆失败: 没有收到服务器响应');
        } else {
            // 其他错误
            window.alert(`登陆失败，其他错误: ${error.message}`);
        }
        }
    };

    return (
        <>
            <nav className="login">
                <div className="background">
                    <img src="src/assets/back.png" onClick={() => navigate('/')} alt="返回" className="back-image" />
                    <div className="bordered-div">
                        <h1 className="head">(◦˙▽˙◦)</h1>
                        <div className="login-id">
                            <img src="src/assets/login/username.png" alt="User Icon" className="input-icon1" />
                            <input
                                type="text"
                                className="userid"
                                placeholder="请输入用户ID"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)} />
                        </div>
                        <div className="login-password">
                            <img src="src/assets/login/password.png" alt="User Icon" className="input-icon2" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="password"
                                placeholder="请输入密码"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <div className="show-password-toggle">
                                <input
                                    type="checkbox"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                                显示密码
                            </div>
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