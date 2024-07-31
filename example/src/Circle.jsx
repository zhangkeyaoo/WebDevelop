import React from 'react';
import './Circle.css';
import { useState } from 'react';

// 我的圈子页面
const Circle = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const circlesPerPage = 5; // 每页显示的圈子数量
      
        // 示例数据
        const circles = [
          '圈子1', '圈子2', '圈子3', '圈子4', '圈子5',
          '圈子6', '圈子7', '圈子8', '圈子9', '圈子10'
        ];
      
        // 计算当前页显示的圈子
        const indexOfLastCircle = currentPage * circlesPerPage;
        const indexOfFirstCircle = indexOfLastCircle - circlesPerPage;
        const currentCircles = circles.slice(indexOfFirstCircle, indexOfLastCircle);
      
        // 翻页处理函数
        const handleNextPage = () => {
          if (currentPage < Math.ceil(circles.length / circlesPerPage)) {
            setCurrentPage(currentPage + 1);
          }
        };
      
        const handlePrevPage = () => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        };
      
    return (
      <div className="circle-my-container">
        <header className="circle-header">
          <h1>我的圈子</h1>
        </header>
        <nav className="circle-my-nav">
          <input type="text" placeholder="查找我的圈子" className="search-box" />
          <button className="create-button">创建圈子</button>
        </nav>
        <div className="circle-content">
        <ul>
          {currentCircles.map((circle, index) => (
            <li key={index}>{circle}</li>
          ))}
        </ul>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            上一页
          </button>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil(circles.length / circlesPerPage)}>
            下一页
          </button>
        </div>
      </div>
      </div>
    );
  };
  
  export default Circle;