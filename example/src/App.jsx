import { useState, useRef } from 'react'
import './App.css'
import React from "react"
import { useNavigate } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('用户昵称');
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState('src/assets/user-avatar.jpg'); // 默认头像路径
  const avatarInputRef = useRef(null);

  // 更新昵称
  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // 触发文件选择
  const triggerFileInput = () => {
    avatarInputRef.current.click();
  };
  // 处理文件选择
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // 将头像设置为用户选择的图片
      };
      reader.readAsDataURL(file);
    }
  };

  // 跳转到个人主页
  const goToHomePage = () => {
    navigate('/home')
  }
  // 跳转到消息页面
  const goToMessagesPage = () => {
    navigate('/messages')
  }
  // 跳转到圈子页面
  const goToCirclePage = () => {
    navigate('/circle')
  }
  return (
    <>

      <nav className='apppage'>
        <div className="app-background">  </div>
          <nav className="app-navbar">
            <button>热门新鲜事</button>
            <button onClick={goToCirclePage}>我的圈子</button>
            <input type="text" placeholder="搜索感兴趣的内容" className="app-search-input" />
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
                onChange={handleAvatarChange} />
            </div>
            <div className="nickname-container">
              <p alt="用户昵称"
                className="user-nickname"
                style={{ marginRight: '5px' }}>{nickname}</p>
              <img src="src/assets/change1.png"
                alt="修改昵称"
                onClick={toggleEditing}
                className="change-icon1" />
            </div>
            {isEditing && (
              <input type="text"
                value={nickname}
                onChange={handleNicknameChange}
                onBlur={toggleEditing}
                autoFocus />
            )}
            <div className='user-info-button'>
              <button onClick={goToHomePage}>主页</button>
              <button onClick={goToMessagesPage}>消息</button>
            </div>
          </div>

      </nav>

    </>
  )
};
export default App
