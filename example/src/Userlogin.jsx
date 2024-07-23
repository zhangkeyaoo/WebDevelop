import { useState } from "react"
import './Userlogin.css'
import React, { Component } from "react"
function Userlogin() {
    return (
        <>

            <nav className="login">
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
                            <button className="login-button-style" > 登录^w^ </button>
                        </p>
                    </div>
                </div>
            </nav>

            <div className="left-content">
                <h1 className="sentence">小鼠兴趣圈，汇聚多元热情，点燃无限创意！</h1>
                <img src="src/assets/welcome.png" alt="欢迎图片" className="welcome-image" />
            </div>
            <nav>
                <div className="right-content">
                    <h1 className="calling1">欢迎踏入"小鼠兴趣圈"!</h1>
                    <h2 className="calling2">
                        渴望分享独特生活哲学的思想家，<br/>追求极致美学的设计师，<br/>
                        热衷探索宇宙奥秘的天文爱好者，<br/>沉浸在书海中的文学青年，<br/>
                        热衷摄影记录生活点滴的摄影师，<br/>沉浸在音乐海洋中的乐迷——<br/>
                        无论你是谁，"小鼠兴趣圈"都将是你展现自我、发现同好的绝佳舞台。</h2>
                    <h3 className="calling3">我们鼓励自由表达，促进知识共享，<br/>让每一个独特的你都能在这里找到归属感。<br/>
                        这里，每一次点击都可能开启一场心灵的旅行，<br/>每一次交流都可能遇见改变你生活的朋友。<br/>
                        加入我们，开启一场跨越兴趣边界的奇妙旅程,让‘小鼠兴趣圈’成为你精彩生活的起点！</h3>
                </div>
            </nav>
        </>
    )
}

export default Userlogin