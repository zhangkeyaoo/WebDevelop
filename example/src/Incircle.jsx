import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Incircle = () => {
    const { id } = useParams();
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
            <header className="incircle-header">
                <h1>{circle.name}</h1>
                <span>成员数量: {userCount}</span>
                <input
                    type="text"
                    placeholder="搜索帖子"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </header>
            {/* 其他内容 */}
        </div>
    );
};

export default Incircle;