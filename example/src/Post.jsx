import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Post.css';
import backIcon1 from './assets/back.png';

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files.length + images.length > 5) {
            alert('最多只能上传五张图片');
            return;
        }
        const newImages = Array.from(e.target.files).map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setImages([...images, ...newImages]);
    };

    const handleRemoveImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };
    const handleSubmmitImg = async (image,index) => {
        const formImageData = new FormData();
        formImageData.append('image', image.file);
        const responseImage = await axios.post('http://localhost:3000/upload', formImageData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("!",responseImage.data.fileUrl);
        return responseImage.data.fileUrl;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            alert('请填写标题或正文哦！');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('circleId', id);
            formData.append('title', title);
            formData.append('content', content);
            formData.append('userId', localStorage.getItem('userId')); //怎么找当前用户id
            
            // images.forEach((image, index) => {
            //     const imageUrl = handleSubmmitImg(image,index);
            //     console.log("image2",imageUrl);
            //     formData.append(`image${index}`,imageUrl);
            // });
            const imageUrls = await Promise.all(
                images.map(async (image, index) => {
                  return await handleSubmmitImg(image, index);
                })
              );
        
        
              imageUrls.forEach((url, index) => {
                formData.append(`images[${index}]`, url);
              });
              console.log("imageUrls",imageUrls);
        
            
            const response = await axios.post('http://127.0.0.1:7001/api/postarticles', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.data.success) {
                navigate(`/circle/${id}`);
            } else {
                console.error('Error creating post:', response.data.message);
                alert('发帖失败');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('发帖失败');
        }
    };

    return (
        <div className="post-container">
            <div className="post-background">  </div>
            <img
                src={backIcon1}
                alt="返回"
                className="back-incircle"
                onClick={() => navigate(`/circle/${id}`)}
            />

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='post-title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="输入帖子的标题吧！"
                    required
                />
                <textarea
                    className='post-content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="输入帖子的正文内容吧！"
                    required
                />
                <input
                    type="file"
                    className='post-image'
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                />
                <div className="image-preview-container">
                    {images.map((image, index) => (
                        <div key={index} className="image-preview">
                            <img src={image.preview} alt={`preview ${index}`} />
                            <button type="button" onClick={() => handleRemoveImage(index)}>删除</button>
                        </div>
                    ))}
                </div>
                <button type="submit" className='post-submit'>去发帖</button>
            </form>
        </div>
    );
};

export default Post;