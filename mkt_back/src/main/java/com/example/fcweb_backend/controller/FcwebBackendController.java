package com.example.fcweb_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FcwebBackendController {
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
}