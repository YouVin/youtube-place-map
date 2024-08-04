package com.example.youtube_place_map;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

public class UserController {

    @PostMapping("/api/auth/google")
    public ResponseEntity<Map<String, String>> login(@RequestBody String token, HttpSession session){
        GoogleInfoDto authenticate = authService.authenticate(token);
        Map<String, String> tokens = loginService.processUserLogin(authenticate);
        session.setAttribute("accessToken", tokens.get("accessToken"));
        session.setAttribute("refreshToken", tokens.get(("refreshToken")));
        return ResponseEntity.ok(tokens);
    }
}
