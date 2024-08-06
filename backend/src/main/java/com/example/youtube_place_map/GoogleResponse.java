package com.example.youtube_place_map;

import java.util.Map;

public class GoogleResponse {
    private final String email;
    private final String name;
    private final Map<String, Object> attributes; // 사용자 속성 추가

    public GoogleResponse(Map<String, Object> attributes) {
        this.attributes = attributes; // 속성 저장
        this.email = (String) attributes.get("email");
        this.name = (String) attributes.get("name");
    }

    // Getter 메서드 추가
    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public Map<String, Object> getAttributes() {
        return attributes; // 속성 반환
    }
}