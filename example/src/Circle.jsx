import React, { useState, useEffect } from 'react';
import './Circle.css';
import axios from 'axios';

// 我的圈子页面
const Circle = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const circlesPerPage = 3; // 每页显示的圈子数量
  const [circles, setCircles] = useState([]);
  const [followingStatus, setFollowingStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCircleName, setNewCircleName] = useState('');

  useEffect(() => {
    const fetchCircles = async () => {
      const savedStatus = localStorage.getItem('followingStatus');
      if (savedStatus) {
        setFollowingStatus(JSON.parse(savedStatus));
      }
      try {
        const response = await axios.get('http://127.0.0.1:7001/api/circles');
        //console.log('Response data:', response.data); // 添加日志信息
        const circlesData = response.data?.data;

        if (Array.isArray(circlesData)) {
          setCircles(circlesData);
          const initialFollowingStatus = circlesData.reduce((acc, circle) => {
            acc[circle.name] = circle.isDefault || (savedStatus && JSON.parse(savedStatus)[circle.name]);
            return acc;
          }, {});
          setFollowingStatus(initialFollowingStatus);
        }
      } catch (error) {
        console.error('Error fetching circles:', error);
      }
    };

    fetchCircles();
  }, []);

  // 初始化每个圈子的关注状态为已加入
  const initialFollowingStatus = circles.reduce((acc, circle) => {
    acc[circle] = true;
    return acc;
  }, {});



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

  // 加入按钮点击处理函数
  const handleFollowClick = (circle) => {
    const updatedStatus = { ...followingStatus, [circle.name]: !followingStatus[circle.name] };
    setFollowingStatus(updatedStatus);
    localStorage.setItem('followingStatus', JSON.stringify(updatedStatus));
    if (followingStatus[circle.name]) {
      const confirmUnfollow = window.confirm('是否退出圈子TAT?');
      if (confirmUnfollow) {
        setFollowingStatus((prevStatus) => ({
          ...prevStatus,
          [circle.name]: false
        }));
      }
    } else {
      setFollowingStatus((prevStatus) => ({
        ...prevStatus,
        [circle.name]: true
      }));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // setSearchTerm(searchValue);
    setCurrentPage(1); // 设置当前页为第一页
  };

  //创造圈子
  const handleCreateCircle = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:7001/api/circles', {
        name: newCircleName,
        isDefault: false
      });
      const newCircle = response.data.data;
      setCircles([...circles, newCircle]);
      setFollowingStatus({ ...followingStatus, [newCircle.name]: true });
      localStorage.setItem('followingStatus', JSON.stringify({ ...followingStatus, [newCircle.name]: true }));
      setShowCreateForm(false);
      setNewCircleName('');
    } catch (error) {
      console.error('Error creating circle:', error);
    };

  };
  let filteredCircles = [];
  if (searchTerm === '') {
     filteredCircles = currentCircles;
  } else {
     filteredCircles = circles.filter((circle) =>
      circle.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(indexOfFirstCircle, indexOfLastCircle);
  }

  return (
    <div className="circle-container">
      <div className="circle-background">  </div>
      <div className="circle-my-container">
        <header className="circle-header">
          <img
            src="src/assets/back.png"
            alt="返回"
            className="back-image"
            onClick={() => window.location.href = '/apppage'}
          />
          <h1>我的圈子</h1>
        </header>
        <nav className="circle-my-nav">
          <input
            type="text"
            placeholder="查找我的圈子"
            className="search-box"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="create-button" onClick={() => setShowCreateForm(true)}>创建圈子</button>
        </nav>
        {showCreateForm && (
          <div className="create-circle-form">
            <input
              type="text"
              placeholder="输入圈子名称"
              value={newCircleName}
              onChange={(e) => setNewCircleName(e.target.value)}
            />
            <button onClick={handleCreateCircle}>确定</button>
            <button onClick={() => setShowCreateForm(false)}>取消</button>
          </div>
        )}
        <div className="circle-content">
          <div className="circle-container">
            {filteredCircles.length > 0 ? (
              filteredCircles.map((circle, index) => (
                <div key={index} className="circle-item">
                  <span>{circle.name}</span>
                  <button
                    className={`follow-button ${followingStatus[circle.name] ? 'following' : ''}`}
                    onClick={() => handleFollowClick(circle)}
                  >
                    {followingStatus[circle.name] ? '已加入' : '加入'}
                  </button>
                  <button className="enter-button">进入</button>
                </div>
              ))
            ) : (
              <p>没有找到圈子。</p>
            )}
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
      </div>
      <div className="circle-all-container">
        <div className="search-all-container">
          <input
            type="text"
            placeholder="搜索更多圈子"
            className="search-all-input"
          />
        </div>
      </div>
    </div>
  );
};

export default Circle;