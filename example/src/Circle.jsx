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
  const [showOnlyJoined, setShowOnlyJoined] = useState(false);

  const fetchCircles = async () => {
    // 从服务器获取圈子数据
    try {
      const response = await axios.get('http://127.0.0.1:7001/api/circles');
      setCircles(response.data.data);
    } catch (error) {
      console.error('Error fetching circles:', error);
    }
  };
  const fetchUserCircles = async () => {
    try {
      const userId = localStorage.getItem('userId'); // 从本地存储获取用户ID
      const response = await axios.get(`http://127.0.0.1:7001/api/user/${userId}/circles`);
      const userCircles = response.data.data;
      const status = userCircles.reduce((acc, circle) => {
        acc[circle.id] = true;
        return acc;
      }, {});
      setFollowingStatus(status);
    } catch (error) {
      console.error('Error fetching user circles:', error);
    }
  };

  useEffect(() => {
    fetchCircles();
    fetchUserCircles();
  }, []);

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
  const handleFollowClick = async (circle) => {
    if (followingStatus[circle.id]) {
      // 弹出确认对话框
      const confirmUnfollow = window.confirm('是否确认退出该圈子？');
      if (confirmUnfollow) {
        try {
          const userId = localStorage.getItem('userId'); // 从本地存储获取用户ID
          await axios.post('http://127.0.0.1:7001/api/circles/unfollow', {
            userId,
            circleId: circle.id,
          });
          setFollowingStatus((prevStatus) => ({
            ...prevStatus,
            [circle.id]: false,
          }));
        } catch (error) {
          console.error('Error unfollowing circle:', error);
        }
      }
    } else {
      try {
        const userId = localStorage.getItem('userId'); // 从本地存储获取用户ID
        await axios.post('http://127.0.0.1:7001/api/circles/follow', {
          userId,
          circleId: circle.id,
        });
        setFollowingStatus((prevStatus) => ({
          ...prevStatus,
          [circle.id]: true,
        }));
      } catch (error) {
        console.error('Error following circle:', error);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // setSearchTerm(searchValue);
    setCurrentPage(1); // 设置当前页为第一页
  };

  //创建圈子
  const handleCreateCircle = async () => {
    try {
      await axios.post('http://127.0.0.1:7001/api/circles', {
        name: newCircleName,
        isDefault: false
      });
      setNewCircleName('');
      setShowCreateForm(false);
      fetchCircles(); // 重新获取圈子列表
    } catch (error) {
      console.error('Error creating circle:', error);
      alert('创建圈子失败，圈子已经存在啦');
    };

  };

  let sortedCircles = circles.sort((a, b) => {
    if (followingStatus[a.id] && !followingStatus[b.id]) {
      return -1;
    }
    if (!followingStatus[a.id] && followingStatus[b.id]) {
      return 1;
    }
    return 0;
  });

  let filteredCircles = [];
  if (searchTerm === '') {
    filteredCircles = sortedCircles;
  } else {
    filteredCircles = sortedCircles.filter((circle) =>
      circle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  filteredCircles = filteredCircles.slice(indexOfFirstCircle, indexOfLastCircle);

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
              placeholder="输入新圈子名称"
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
            filteredCircles.map((circle) => (
              <div key={circle.id} className="circle-item">
                <span>{circle.name}</span>
                <button
                  className={`follow-button ${followingStatus[circle.id] ? 'following' : ''}`}
                  onClick={() => handleFollowClick(circle)}
                >
                      {followingStatus[circle.id] ? '已加入' : '加入'}
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
      {/* <div className="circle-all-container">
        <div className="search-all-container">
          <input
            type="text"
            placeholder="搜索更多圈子"
            className="search-all-input"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Circle;