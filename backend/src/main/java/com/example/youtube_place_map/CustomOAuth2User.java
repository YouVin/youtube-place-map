package com.example.youtube_place_map;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import lombok.RequiredArgsConstructor;
import com.example.youtube_place_map.GoogleResponse;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {

    private final GoogleResponse googleResponse; // GoogleResponse 객체
    private final String role; // 사용자 역할

    @Override
    public <A> A getAttribute(String name) {
        // GoogleResponse에서 특정 속성을 가져오도록 구현
        return (A) googleResponse.getAttributes().get(name);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return googleResponse.getAttributes(); // GoogleResponse의 속성 반환
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(() -> role); // 역할 반환
        return collection;
    }

    @Override
    public String getName() {
        return googleResponse.getName(); // GoogleResponse에서 이름 반환
    }

    public String getUsername() {
        return googleResponse.getEmail(); // 이메일을 사용자 이름으로 사용
    }
}
