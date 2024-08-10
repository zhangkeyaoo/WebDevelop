import React, { useState, useEffect } from 'react';
import './CommentWindow.css';
import axios from 'axios';

const CommentWindow = ({ postId, onClose,userId, username }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);
    const [showCommentInput, setShowCommentInput] = useState(false);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:7001/api/posts/${postId}/comments`);
            console.log('Fetched comments response:', response); // 添加日志
            if (response.data.success) {
                setComments(response.data.data || []);
            } else {
                setError('Failed to fetch comments');
            }
        } catch (error) {
            console.error('Error fetching comments:', error); // 添加日志
            setError('Error fetching comments');
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) {
            alert('输入评论不能为空');
            return;
        }
        try {
            const response = await axios.post(`http://127.0.0.1:7001/api/posts/${postId}/comments`, {
                content: newComment,
                userId: userId,
            });
            if (response.data.success) {
                setComments([...comments, response.data.data]);
                setNewComment('');
                setShowCommentInput(false);

            } else {
                setError('Failed to submit comment');
            }
        } catch (error) {
            setError('Error submitting comment');
        }
    };

    const handleCommentCancel = () => {
        setNewComment('');
        setShowCommentInput(false);
    };

    return (
        <div className="comment-window">
            <div className="comment-window-header">
                <h2>评论</h2>
                <button onClick={onClose}>关闭</button>
            </div>
            <div className="comment-list">
                {comments.map((comment, index) => (
                    <div key={index} className="comment-item">
                        <strong>{comment.user.username}:</strong> {comment.content}
                    </div>
                ))}
            </div>
            {showCommentInput ? (
                <div className="comment-input-container">
                    <textarea
                        className="comment-input"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="输入评论..."
                    />
                    <button className="handle-comment" onClick={handleCommentSubmit}>提交评论</button>
                    <button className="cancel-comment" onClick={handleCommentCancel}>取消</button>
                </div>
            ) : (
                <button className="comment-button" onClick={() => setShowCommentInput(true)}>我要评论</button>
            )}
        </div>
    );
};

export default CommentWindow;