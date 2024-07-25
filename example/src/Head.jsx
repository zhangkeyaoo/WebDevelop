import { useEffect, useState } from "react"
import './Head.css'
import React, { Component } from "react"

const images = [  
    'src/assets/1.jpg',  
    'src/assets/2.jpg',  
    'src/assets/3.jpg',  
    'src/assets/4.jpg',  
    'src/assets/5.jpg'  
];

function Head() {
    const [currentImage, setCurrentImage] = useState(images[0]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            setCurrentIndex(nextIndex);
            setCurrentImage(images[nextIndex]);
        }, 3000);

        return () => clearInterval(interval); // 清理函数，组件卸载时停止轮播  
    }, [currentIndex]);

    return (
        <>
           <div className="background-slider" style={{ backgroundImage: `url(${currentImage})` }}>
                <nav className="navbar">
                    <div className="navbar-brand">
                        <a href="#">
                            <img src="src/assets/title.png" alt="兴趣圈logo" className="navbar-brand-img" />
                            小鼠兴趣圈
                        </a>
                    </div>
                    <div className="navbar-search">
                        <input type="text" className="search" placeholder="搜索兴趣圈子>w<" />
                        
                    </div>
                    <ul className="navbar-links">
                        <li><a href="#">首页</a></li>
                        <li className="help"><a href="#">帮助</a></li>
                        <li className="navbar-login">
                            <a href="/login">登录</a>
                        </li>
                    </ul>
                </nav >
                {/* <div><h1 className="welcome">Hi! 欢迎来到小鼠兴趣圈</h1></div>
                <div><h1 className="conUS">联系作者1652046628@qq.com</h1></div> */}
            </div>
        </>

    );
}

export default Head;