package com.example.fcweb_backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.openai.OpenAiChatModel;

@RestController
public class FcwebChatController {
    
    ChatLanguageModel chatLanguageModel;

    @Value("${langchain4j.open-ai.chat-model.api-key}")
    private String apiKey;

    private final OpenAiChatModel model;

    // 构造函数，初始化 OpenAiChatModel
    public FcwebChatController(ChatLanguageModel chatLanguageModel) {
        this.model = null;
        this.chatLanguageModel = chatLanguageModel;
    }

    // 新增的 chat 方法
    @GetMapping("/chat")
    public String model(@RequestParam(value = "question", defaultValue = "Hello") String question) {
        // 验证输入
        if (question == null || question.trim().isEmpty()) {
            return "问题不能为空";
        }

        try {
            System.out.println("question: " + question);
            System.out.println("chatLanguageModel: " + chatLanguageModel);
            System.out.println("apiKey: " + apiKey);
            return chatLanguageModel.generate(question);
        } catch (Exception e) {
            e.printStackTrace();
            return "错误: " + e.getMessage();
        }
    }
}
