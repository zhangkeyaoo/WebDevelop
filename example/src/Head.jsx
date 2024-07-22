import { useState } from "react"
import'./Head.css'
import React,{Component} from "react"

function Head(){
    const[count,setCount]=useState(0)

    return(
        <>
            <nav className="navbar">  
      <div className="navbar-brand">  
          <a href="#">兴趣圈Logo</a>  
      </div>  
      <div className="navbar-search">  
          <input type="text" className="search" placeholder="搜索兴趣圈子>w<"/>
            
      </div>  
      <ul className="navbar-links">  
          <li><a href="#">首页</a></li>  
          <li><a href="#">帮助</a></li>  
          <li><a href="#">联系我们</a></li>  
          <li className="navbar-login">  
              <a href="/login">登录/注册</a>
          </li>  
      </ul>  
  </nav>  
  <div><h1>Hi！，欢迎来到小鼠兴趣圈</h1></div>
        </>

    );
}

export default Head;