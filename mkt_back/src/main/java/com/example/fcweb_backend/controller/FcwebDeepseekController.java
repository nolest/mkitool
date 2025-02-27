package com.example.fcweb_backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@RestController
@RequestMapping("/api") // 基础路径
public class FcwebDeepseekController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/dschat")
    public ResponseEntity<String> chatWithDeepSeek(
            @RequestParam("question") String question) {
        
        try {
            // 1. 构造请求参数（根据DeepSeek API实际要求修改）
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer KEYYYYYY"); // 需要替换为真实API密钥

            // 2. 构建请求体（示例结构，需根据实际API文档调整）
            String requestJson = String.format("""
                {
                    "messages": [
                        {"role": "user", "content": "%s"}
                    ],
                    "model": "deepseek-chat",
                    "temperature": 0.7
                }
                """, question);

            // 3. 发送请求到DeepSeek API（替换为真实API地址）
            HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);
            ResponseEntity<String> response = restTemplate.exchange(
                "https://api.deepseek.com/v1/chat/completions", // API地址
                HttpMethod.POST,
                entity,
                String.class
            );

            System.out.println("response: " + response.getBody());
            // 4. 返回处理结果（根据实际响应结构解析）
            return ResponseEntity.ok(response.getBody());
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("请求失败: " + e.getMessage());
        }
    }
}
