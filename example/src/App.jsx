import { useState, useRef, useEffect } from 'react'
import './App.css'
import React from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState('src/assets/user-avatar.jpg'); // 默认头像路径
  const avatarInputRef = useRef(null);
  const [username, setUsername] = useState('');
  const [userID, setUserId] = useState('');

  //读取用户名
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    const storedAvatar = localStorage.getItem('avatar');

    console.log('Stored UserName:', storedUsername); // 添加调试信息

    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  // 更新昵称
  const handleNicknameChange = (e) => {
    setUsername(e.target.value);
  };
  const toggleEditing = async () => {
    if (isEditing) {
      try {
        const response = await axios.put('http://127.0.0.1:7001/api/updateUsername', {
          userId: userID,
          newUsername: username,
        });
        if (response.data.success) {
          localStorage.setItem('username', username);
          alert('用户名更新成功');
        } else {
          alert('用户名更新失败');
        }
      } catch (error) {
        console.error('Error updating username:', error);
        alert('用户名更新失败');
      }
    }
    setIsEditing(!isEditing);
  };

  // 触发头像文件选择
  const triggerFileInput = () => {
    avatarInputRef.current.click();
  };
  // 处理头像文件选择
  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const response = await axios.post('http://127.0.0.1:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.data.success) {
          const newAvatarUrl = response.data.fileUrl;
          setAvatar(newAvatarUrl); // 更新头像为服务器返回的文件 URL
          localStorage.setItem('avatar', newAvatarUrl); // 存储新的头像 URL 到 local
  
          // 更新用户头像 URL 到数据库
          const updateResponse = await axios.put('http://127.0.0.1:7001/api/updateAvatar', {
            userId: userID,
            newAvatarUrl: newAvatarUrl,
          });
  
          if (updateResponse.data.success) {
            alert('头像更新成功');
          } else {
            alert('头像更新失败');
          }
        } else {
          alert('头像更新失败');
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        alert('头像更新失败');
      }
    }
  };

  // // 跳转到消息页面
  // const goToMessagesPage = () => {
  //   navigate('/messages')
  // }

  // 跳转到圈子页面
  const goToCirclePage = () => {
    navigate('/circle')

  }
  const goToLoginPage = () => {
    navigate('/login')
  }

  return (
    <>
      <nav className='apppage'>
        <div className="app-background">  </div>
        <nav className="app-navbar">
          <button>热门新鲜事</button>
          <button onClick={goToCirclePage}>我的圈子</button>
          <button onClick={() => {
            if (window.confirm('确定要退出登录吗QAQ?')) {
              goToLoginPage();
            }
          }}>退出登录</button>
        </nav>
        <div className="user-info">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={avatar} alt="用户头像" className='user-avatar' />
            <img
              src="src/assets/change2.png"
              alt="修改头像"
              className="change-icon2"
              onClick={triggerFileInput}
            />
            <input type="file"
              ref={avatarInputRef}
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </div>
          <div className="nickname-container">
            <div className='user-nickname'>
              <p> {username}</p>
            </div>
            <img src="src/assets/change1.png"
              alt="修改昵称"
              onClick={toggleEditing}
              className="change-icon1"
            />
          </div>
          <div className='user-id'>
            <p>ID: {userID}</p> 
          </div>
          {isEditing && (
            <input type="text"
              value={username}
              onChange={handleNicknameChange}
              onBlur={toggleEditing}
              autoFocus
            />
          )}
          {/* <div className='user-info-button'>

            <button onClick={goToMessagesPage}>消息</button>
          </div> */}
        </div>
      </nav>
    </>
  )
};
export default App
