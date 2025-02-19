const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const chatRoutes = require('./routes/chatRoutes');  // 新增引入

const app = express();

// 中间件配置
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000' // 对接前端项目
}));
app.use(helmet());
app.use(morgan('dev'));

// 健康检查路由
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    version: process.env.npm_package_version
  });
});

// 添加聊天路由
app.use('/api/chat', chatRoutes);  // 新增路由挂载

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});