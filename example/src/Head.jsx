import { useEffect, useState } from "react"
import './Head.css'
import React, { Component } from "react"

const images = [  
    'src/assets/begin/1.jpg',  
    'src/assets/begin/2.jpg',  
    'src/assets/begin/3.jpg',  
    'src/assets/begin/4.jpg',  
    'src/assets/begin/5.jpg'  
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
        <div className="fixed-text-box">
                <p>热爱探店的美食家、追求美学的设计师、探索宇宙的天文迷、<br/>
                记录生活的摄影师、钟爱音乐的发烧友……<br/>
                无论你是谁，"小鼠兴趣圈"都是你展现真我、遇见同好的精彩平台。<br/>
                我们鼓励自由表达与知识共享，让每个独特的你找到归属感。<br/>
                        在这里，每一点击都引领心灵之旅，每回交流或遇挚友。<br/>
                        加入我们，启程跨界兴趣之旅，点亮精彩生活！<br/>
                        联系作者1652046628@qq.com</p>
            </div>
           <div className="background-slider" style={{ backgroundImage: `url(${currentImage})` }}>
                <nav className="navbar">
                    <div className="navbar-brand">
                        <a href="#">
                            <img src="src/assets/title.png" alt="兴趣圈logo" className="navbar-brand-img" />
                            小鼠兴趣圈
                        </a>
                    </div>

                    <ul className="navbar-links">
                        <li><a href="#">首页</a></li>
                        <li className="help"><a href="#">帮助</a></li>
                        <li className="navbar-login">
                            <a href="/login">登录</a>
                        </li>
                    </ul>
                </nav >
            </div>
        </>

    );
}

export default Head;