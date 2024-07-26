const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// 使用CORS中间件来允许跨域请求
app.use(cors());

// 使用body-parser中间件来解析JSON请求体
app.use(bodyParser.json());

// 定义一个POST路由来处理登录请求
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 简单的账号和密码验证
    if (username === '12345' && password === '67890') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// 启动服务器并监听指定端口
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});