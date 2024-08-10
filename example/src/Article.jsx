import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentWindow from './CommentWindow'; // 引入评论窗口
import './Article.css';
import backIcon from './assets/back.png';
import likeIcon from './assets/like.png';
import afterLikeIcon from './assets/afterlike.png';
import commentIcon from './assets/comment.png';
import noPicture from './assets/no-picture.jpg'; // 当帖子没有图片时显示的默认图片

const Article = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [likeImg, setLikeImg] = useState(likeIcon);
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState(localStorage.getItem('userId')); // 从 localStorage 中读取用户ID
    const [username, setUsername] = useState(localStorage.getItem('username')); // 从 localStorage 中读取用户名
    const [currentPage, setCurrentPage] = useState(0); // 当前图片页码
    const [showCommentWindow, setShowCommentWindow] = useState(false); // 管理评论窗口的显示
    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:7001/api/posts/${postId}`);
                setPost(response.data.data.post);
                console.log('response:', response.data.data.post);
                if (response.data.data.post.likedUsers.some(user => user.id === parseInt(userId))) {
                    setLikeImg(afterLikeIcon);
                }
            } catch (error) {
                handleError(error);
            }
        };

        fetchPostDetails();
    }, [postId, userId]);

    const handleError = (error) => {
        if (error.response) {
            setError(error.response.data.message || 'Error fetching data');
        } else if (error.request) {
            setError('No response received from server');
        } else {
            setError(error.message);
        }
    };

    const handleLikeClick = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:7001/api/posts/${postId}/like`, { userId });
            if (response.data.success) {
                setPost(prevPost => ({
                    ...prevPost,
                    ...response.data.data
                })); // 更新 post 数据
                console.log('response:', response.data.data);
                setLikeImg(afterLikeIcon); // 点赞图片更换
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            handleError(error);
        }
    };

    const handleCommentClick = () => {
        setShowCommentWindow(true); // 显示评论窗口
    };

    const handleCommentWindowClose = () => {
        setShowCommentWindow(false); // 隐藏评论窗口
    };

    const handleNextPage = () => {
        if (currentPage < post.images.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>加载中...</div>;
    }

    return (
        <div className="article-container">
            <div className="article-background">  </div>
            <div className="article-header">
                <img
                    src={backIcon}
                    alt="返回"
                    className="back-button"
                    onClick={() => navigate(-1)}
                />
                <p className='postuser-name'>发帖人: {post.user.username}</p>
                <h1 className='article-title'>{post.title}</h1>
            </div>
            <div className="article-content">
                {post.images && post.images.length > 0 ? (
                    <div className="image-pagination">
                        <img src={post.images[currentPage]} alt={`文章图片 ${currentPage + 1}`} className="article-image" />
                        <div className="pagination-controls">
                            <button onClick={handlePrevPage} disabled={currentPage === 0}>上一页</button>
                            <button onClick={handleNextPage} disabled={currentPage === post.images.length - 1}>下一页</button>
                        </div>
                    </div>
                ) : (
                    <img src={noPicture} alt="文章图片" className="article-image" />
                )}
                <div className="content-container">
                    <div className="content">{post.content}</div>
                </div>
            </div>
            <div className="interact-box">
                <img className='like-img' src={likeImg} alt="点赞" onClick={handleLikeClick} />
                <p className='like-count'>{post.likeCount}</p>
                <img className='comment-img' src={commentIcon} alt="评论" onClick={handleCommentClick} />
            </div>
            {showCommentWindow && (
                <CommentWindow postId={postId} onClose={handleCommentWindowClose}userId={userId} username={username} />
            )}
        </div>
    );
};

export default Article;