const express = require('express');
const router = express.Router();
const axios = require('axios');

// 处理聊天请求
router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "deepseek/deepseek-r1:free",
      messages: messages
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.SITE_URL,
        "X-Title": process.env.SITE_NAME,
        "Content-Type": "application/json"
      }
    });

    res.json({
      success: true,
      data: response.data
    });
    
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.error?.message || 'AI服务请求失败'
    });
  }
});

module.exports = router; 