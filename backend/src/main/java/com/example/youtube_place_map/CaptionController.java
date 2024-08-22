package com.example.youtube_place_map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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
        String videoId = payload.get("accessToken"); // videoId를 가져옵니다.
        String accessToken = payload.get("videoId"); // accessToken을 가져옵니다.

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
            String captionId = extractCaptionId(response.getBody()); // ID 추출 메소드 호출

            if (captionId != null) {
                return ResponseEntity.ok(captionId); // 자막 ID 반환
            } else {
                return ResponseEntity.status(404).body("자막 ID를 찾을 수 없습니다.");
            }
        } else {
            return ResponseEntity.status(response.getStatusCode()).body("Failed to retrieve captions");
        }
    }

    private String extractCaptionId(String jsonResponse) {
        // JSON 파싱하여 ID 추출
        try {
            JSONObject jsonObject = new JSONObject(jsonResponse);
            JSONArray items = jsonObject.getJSONArray("items");

            if (items.length() > 0) {
                return items.getJSONObject(0).getString("id"); // 첫 번째 아이템의 ID 반환
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null; // ID를 찾지 못한 경우
    }

}

