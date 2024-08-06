package com.example.youtube_place_map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Autowired
    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        GoogleResponse googleResponse = new GoogleResponse(oAuth2User.getAttributes());

        // 사용자 정보를 데이터베이스에 저장
        String email = googleResponse.getEmail();
        User user = userRepository.findByEmail(email);

        if (user == null) {
            // 새로운 사용자 등록
            user = new User();
            user.setEmail(email);
            user.setName(googleResponse.getName());
            user.setRole("ROLE_USER"); // 기본 역할 지정
            userRepository.save(user);
        }

        return new CustomOAuth2User(googleResponse, user.getRole());
    }
}