package com.example.youtube_place_map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
public class CaptionController {

    @Value("${youtube.api.key}") // application.properties에서 API 키를 주입
    private String youtubeApiKey;

    @GetMapping("/") // 루트 경로에 대한 GET 요청 처리
    public ResponseEntity<String> welcomeMessage() {
        return ResponseEntity.ok("Welcome to the YouTube Place Map API!");
    }

    @PostMapping("/api/captions")
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> receiveVideoData(@RequestBody Map<String, String> payload) {
        String videoId = payload.get("accessToken");
        String accessToken = payload.get("videoId");

        // 로그 출력
        System.out.println("Received Video ID: " + videoId);
        System.out.println("Received Access Token: " + accessToken);

        // YouTube API 호출
        String captionUrl = "https://www.googleapis.com/youtube/v3/captions?videoId=" + videoId + "&key=" + youtubeApiKey;

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(captionUrl, HttpMethod.GET, entity, String.class);

        // 캡션 데이터를 처리
        if (response.getStatusCode().is2xxSuccessful()) {
            System.out.println("Received Captions: " + response.getBody());
            return ResponseEntity.ok("Captions retrieved successfully: " + response.getBody());
        } else {
            return ResponseEntity.status(response.getStatusCode()).body("Failed to retrieve captions");
        }
    }

}

