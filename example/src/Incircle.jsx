import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Incircle.css';
import backIcon from './assets/back.png';

const Incircle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [circle, setCircle] = useState({ name: '', isDefault: true, userCount: 0, id: 0 });
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const fetchCircleDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:7001/api/circles/${id}`);
                console.log('response:', response.data.data.circle);
                setCircle(response.data.data.circle);
                setUserCount(response.data.data.circle.userCount);
            } catch (error) {
                if (error.response) {
                    // 请求已发出，但服务器响应了状态码不在 2xx 范围内
                    console.error('Error fetching circle details:', error.response.data);
                    setError(error.response.data.message || 'Error fetching circle details');
                } else if (error.request) {
                    // 请求已发出，但没有收到响应
                    console.error('No response received:', error.request);
                    setError('No response received from server');
                } else {
                    // 其他错误
                    console.error('Error:', error.message);
                    setError(error.message);
                }
            }
        };


        fetchCircleDetails();
    }, [id]);

    console.log('circle:', circle);
    // setUserCount(circle.userCount);
    console.log('userCount:', userCount);

    if (error) {
        return <div>{error}</div>;
    }

    if (!circle) {
        return <div>加载中...</div>;
    }

    return (
        <div className="incircle-container">
            <div className="incircle-background">  </div>
            <header className="incircle-header">
                <img
                    src={backIcon}
                    alt="返回"
                    className="back-button"
                    onClick={() => navigate('/circle')}
                />
                <h1 className='circle-name'>{circle.name}</h1>
                <span className='user-count'>成员数量: {userCount}</span>
                <input className='search-article'
                    type="text"
                    placeholder="搜索帖子"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="post-button" onClick={() => navigate(`/circle/${id}/post`)}>发帖</button>
            </header>
            <h2 className="latest-posts-title">最新帖子</h2>
            <div className="posts-section">
                
                {/* 在这里添加帖子的内容 */}
            </div>
            {/* 其他内容 */}
        </div>
    );
};

export default Incircle;