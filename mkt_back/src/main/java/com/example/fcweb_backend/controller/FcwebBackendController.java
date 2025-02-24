package com.example.fcweb_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import okhttp3.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;

@RestController
public class FcwebBackendController {
    private static final String API_KEY = "你的API密钥"; // 替换成你的 sk-xxx
    private static final String API_URL = "https://api.openai.com/v1/chat/completions";
    private static final OkHttpClient client = new OkHttpClient();
    private static final ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from fcweb_backend!";
    }

    @GetMapping("/sum")
    public int sum(@RequestParam("nums") String nums) {
        String[] numStrings = nums.split(",");
        int sum = 0;
        for (String num : numStrings) {
            sum += Integer.parseInt(num.trim());
        }
        return sum;
    }
    
    @PostMapping("/chat") 
    public String sendgpt(@RequestParam("prompt") String prompt) {
        // 验证输入
        if (prompt == null || prompt.trim().isEmpty()) {
            return "Prompt cannot be empty";
        }

        String json = String.format(
            "{\"model\": \"gpt-3.5-turbo\", \"messages\": [{\"role\": \"user\", \"content\": \"%s\"}], \"max_tokens\": 500}",
            prompt
        );
        RequestBody body = RequestBody.create(json, MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
            .url(API_URL)
            .header("Authorization", "Bearer " + API_KEY)
            .post(body)
            .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("请求失败: " + response);
            }
            // 解析响应
            String responseBody = response.body().string();
            JsonNode jsonNode = mapper.readTree(responseBody);
            return jsonNode.path("choices").get(0).path("message").path("content").asText();
        } catch (IOException e) {
            // 处理IO异常
            return "An error occurred: " + e.getMessage();
        } catch (Exception e) {
            // 处理其他异常
            return "An unexpected error occurred: " + e.getMessage();
        }
    }
}