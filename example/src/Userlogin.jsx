import { useState } from "react"
import'./Userlogin.css'
import React,{Component} from "react"
function Userlogin(){
    return(
        <>
            <nav className="login">  
      <h1 className="head">(◦˙▽˙◦)</h1>
      <div className="login-name">  
        <img src="src/assets/username.png" alt="User Icon" className="input-icon1" />
          <input type="text" className="username" placeholder="请输入用户名"/>
      </div>  
      <div className="login-password">  
      <img src="src/assets/password.png" alt="User Icon" className="input-icon2" />
          <input type="password" className="password" placeholder="请输入密码"/>
      </div>  
      <div className="login-button">
      <p>
        <button className="login-button-style" > 登录^w^ </button>
        </p> 
        </div>
  </nav>  
  <div className="left-content">  
    <h1 className="sentence">欢迎来到——小鼠兴趣圈！</h1>  
    <img src="src/assets/welcome.png" alt="欢迎图片" className="welcome-image" />  
</div>
        </>
    )
}

export default Userlogin