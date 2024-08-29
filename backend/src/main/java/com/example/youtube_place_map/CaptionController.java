package com.example.youtube_place_map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
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
    public ResponseEntity<byte[]> receiveVideoData(@RequestBody Map<String, String> payload) {
        String videoId = payload.get("videoId");
        String accessToken = payload.get("accessToken");

        // 로그 출력
        System.out.println("Received Video ID: " + videoId);
        System.out.println("Received Access Token: " + accessToken);

        // YouTube API 호출하여 캡션 ID 가져오기
        String captionUrl = "https://www.googleapis.com/youtube/v3/captions?videoId=" + videoId + "&key=" + youtubeApiKey + "&part=snippet";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(captionUrl, HttpMethod.GET, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            String captionId = extractCaptionId(response.getBody());
            System.out.println(captionId);
            if (captionId != null) {
                byte[] subtitles = fetchSubtitles(captionId, accessToken);
                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                responseHeaders.setContentDisposition(ContentDisposition.builder("attachment")
                        .filename("subtitles.srt") // 파일명 설정
                        .build());
                return new ResponseEntity<>(subtitles, responseHeaders, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("캡션 ID를 찾을 수 없습니다.".getBytes());
            }
        } else {
            return ResponseEntity.status(response.getStatusCode()).body(("YouTube API 호출 실패: " + response.getBody()).getBytes());
        }
    }

    private String extractCaptionId(String jsonResponse) {
        // JSON 응답에서 캡션 ID를 추출하는 로직을 구현합니다.
        try {
            JSONObject jsonObject = new JSONObject(jsonResponse);
            JSONArray items = jsonObject.getJSONArray("items");
            if (items.length() > 0) {
                return items.getJSONObject(0).getString("id"); // 첫 번째 캡션 ID 반환
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }

    private byte[] fetchSubtitles(String captionId, String accessToken) {
        String subtitlesUrl = "https://www.googleapis.com/youtube/v3/captions/" + captionId + "?key=" + youtubeApiKey;

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<byte[]> response = restTemplate.exchange(subtitlesUrl, HttpMethod.GET, entity, byte[].class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody(); // 자막 반환
        } else {
            return ("자막을 가져오는 데 실패했습니다: " + response.getBody()).getBytes();
        }
    }


}
