import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Activity.css';

const Active = ({ data, onClose }) => {
    const [error, setError] = useState(null);
    console.log('data:', data);

    return (
        <div className="active-container">
            <div className="active-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h2>成员活跃情况</h2>
                {error ? (
                    <div className="error">{error}</div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>用户名</th>
                                <th>发帖数</th>
                                <th>评论数</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((activity, index) => (
                                <tr key={index}>
                                    <td>{activity.username}</td>
                                    <td>{activity.postCount}</td>
                                    <td>{activity.commentCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Active;