import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Incircle.css';
import Active from './Activity';
import backIcon from './assets/back.png';

const Incircle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [circle, setCircle] = useState({ name: '', isDefault: true, userCount: 0, id: 0 });
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]); // 
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [userCount, setUserCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const postsPerPage = 4; // 每页显示的帖子数量
    const [showActive, setShowActive] = useState(false); // 控制 Active界面显示
    const [activityData, setActivityData] = useState([]); // 活跃情况数据

    useEffect(() => {
        const fetchCircleDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:7001/api/circles/${id}`);
                console.log('response:', response.data.data.circle);
                setCircle(response.data.data.circle);
                setUserCount(response.data.data.circle.userCount);
            } catch (error) {
                handleError(error);
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:7001/api/circles/${id}/posts`);
                setPosts(response.data.data.posts);
                setFilteredPosts(response.data.data.posts); // 初始化时设置过滤后的帖子
            } catch (error) {
                handleError(error);
            }
        };

        fetchCircleDetails();
        fetchPosts();
    }, [id]);

    useEffect(() => {
        // 由搜索词过滤帖子
        const filtered = posts.filter(post => post.title.includes(searchTerm));
        setFilteredPosts(filtered);
    }, [searchTerm, posts]);

    const handleError = (error) => {
        if (error.response) {
            setError(error.response.data.message || 'Error fetching data');
        } else if (error.request) {
            setError('No response received from server');
        } else {
            setError(error.message);
        }
    };

    console.log('circle:', circle);
    console.log('userCount:', userCount);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(posts.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const fetchActivityData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:7001/api/circles/${id}/activities`);
            console.log('API response:', response.data); // 添加日志
            if (response.data.success) {
                setActivityData(response.data.data);
                console.log('activityData:', activityData);
                setShowActive(true);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching activity data:', error);
            setError('Error fetching activity data');
        }
    };

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
                    placeholder="搜索帖子标题"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="post-button" onClick={() => navigate(`/circle/${id}/post`)}>发帖</button>
                <button className="activity-button" onClick={fetchActivityData}>成员活跃情况</button>
            </header>
            <h2 className="latest-posts-title">最新帖子</h2>
            <div className="posts-section">
                <div className="posts-header">
                    <span>标题</span>
                    <span>发帖人</span>
                    <span>预览</span>
                </div>
                {currentPosts.map(post => (
                    <div key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        <p>发帖人: {post.user.username}</p>
                        <p className="post-preview">预览: {post.content.slice(0, 15)}...</p> {/* 正文预览 */}
                        <button className="view-button" onClick={() => navigate(`/post/${post.id}`)}>查看</button>
                    </div>
                ))}
                <div className="pagination-article">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>上一页</button>
                    <span>第 {currentPage} 页</span>
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}>下一页</button>

                </div>
            </div>
            {showActive && (
                <>
                    {console.log('activityData:', activityData)}
                    <Active data={activityData} onClose={() => setShowActive(false)} />
                </>
            )}
        </div>
    );
};

export default Incircle;