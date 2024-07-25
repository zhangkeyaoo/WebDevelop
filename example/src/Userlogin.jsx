import { useState } from "react"
import './Userlogin.css'
import React, { Component } from "react"
import { Navigate } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
function Userlogin() {
    const navigate=useNavigate()
    return (
        <>

            <nav className="login">
            <div className="background">  
            <img src="src/assets/back.png" onClick={()=>navigate('/')} alt="返回" className="back-image" />
                <div className="bordered-div">
                    <h1 className="head">(◦˙▽˙◦)</h1>
                    <div className="login-name">
                        <img src="src/assets/username.png" alt="User Icon" className="input-icon1" />
                        <input type="text" className="username" placeholder="请输入用户名" />
                    </div>
                    <div className="login-password">
                        <img src="src/assets/password.png" alt="User Icon" className="input-icon2" />
                        <input type="password" className="password" placeholder="请输入密码" />
                    </div>
                    <div className="login-button">
                        <p>
                            <button className="login-button-style" onClick={()=>navigate('/apppage')} > 登录^w^ </button>
                        </p>
                    </div>
                </div>
                </div> 
            </nav>
            
            {/* <div className="left-content">
            <img src="src/assets/home.png" onClick={()=>navigate('/')} alt="返回首页" className="back-image" />
                <h1 className="sentence">小鼠兴趣圈，汇聚多元热情，点燃无限创意！</h1>
                <img src="src/assets/welcome.png" alt="欢迎图片" className="welcome-image" />
            </div>
            <nav>
                <div className="right-content">
                    <h1 className="calling1">欢迎踏入"小鼠兴趣圈"!</h1>
                    <h2 className="calling2">
                        无论你是分享生活哲学的思想家、追求美学的设计师、探索宇宙的天文迷、文学爱好者、记录生活的摄影师，还是音乐发烧友，
                        "小鼠兴趣圈"都是展现真我、遇见同好的精彩平台。</h2>
                    <h3 className="calling3">
                        我们鼓励自由表达与知识共享，让每个独特的你找到归属感。
                        在‘小鼠兴趣圈’，每一点击都引领心灵之旅，每回交流或遇挚友。
                        加入我们，启程跨界兴趣之旅，点亮精彩生活！</h3>
                </div>
            </nav> */}
        </>
    )
}

export default Userlogin