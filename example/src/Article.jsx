import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState(localStorage.getItem('userId')); // 从 localStorage 中读取用户 ID
    const [currentPage, setCurrentPage] = useState(0); // 当前图片页码

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
    }, [postId,userId]);

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
        setShowCommentBox(true); // 显示评论输入框
    };

    const handleCommentSubmit = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:7001/api/posts/${postId}/comments`, {
                content: comment,
            });
            if (response.data.success) {
                setComment(''); // 清空输入框
                setShowCommentBox(false); // 隐藏输入框
                // 这里可以添加刷新评论列表的逻辑
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            handleError(error);
        }
    };

    const handleCommentCancel = () => {
        setComment(''); // 清空输入框
        setShowCommentBox(false); // 隐藏输入框
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
                {/* <p className='comment-count'>{post.commentCount}</p> */}
            </div>
            {showCommentBox && (
                <div className="comment-box">
                    <textarea
                        className='comment-input'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="输入评论..."
                    />
                    <button className='handle-comment' onClick={handleCommentSubmit}>提交评论</button>
                    <button className='cancel-comment' onClick={handleCommentCancel}>取消</button>
                </div>
            )}
        </div>
    );
};

export default Article;