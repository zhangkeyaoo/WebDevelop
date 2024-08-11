import './Userlogin.css'
import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Userlogin() {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

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
                window.alert(`登陆失败: ${error.response.data.message || '服务器错误'}`);
            } else if (error.request) {
                window.alert('登陆失败: 没有收到服务器响应');
            } else {
                window.alert(`登陆失败，其他错误: ${error.message}`);
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:7001/api/register', {
                userId,
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;

            if (data.success) {
                window.alert('注册成功，请登录');
                setIsRegistering(false);
            } else {
                window.alert('注册失败TAT');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            window.alert('注册失败TAT');
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
                        <div className="register-button">
                            <p>
                                <button className="register-button-style" onClick={() => setIsRegistering(true)}> 注册账号 </button>
                            </p>
                        </div>
                    </div>
                </div>
            </nav>

            {isRegistering && (
                <div className="register-container">
                    <h1 className="register-header">注册账号</h1>
                    <form className="register-form" onSubmit={handleRegister}>
                        <div className="login-id">
                            <input
                                type="text"
                                className="userid"
                                placeholder="请输入新用户ID(数字)"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)} />
                        </div>
                        <div className="login-id">
                            <input
                                type="text"
                                className="userid"
                                placeholder="请输入新用户名"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="login-password">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="password"
                                placeholder="请输入新用户密码"
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
                        <div className="register-button1">
                            <p>
                                <button className="register-button1-style" type="submit"> 注册^w^ </button>
                            </p>
                        </div>
                        <div className="backtolog-button">
                            <p>
                                <button className="backtolog-button-style" onClick={() => setIsRegistering(false)}> 返回登录 </button>
                            </p>
                        </div>
                    </form>
                </div>
            )}

            <div className="sentence">
                <p >小鼠兴趣圈，汇聚多元热情，点燃无限创意！</p>
            </div>
        </>
    )
}

export default Userlogin