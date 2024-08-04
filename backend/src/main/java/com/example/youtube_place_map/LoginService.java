package com.example.youtube_place_map;

import com.nimbusds.oauth2.sdk.token.RefreshToken;

import java.util.Map;

public class LoginService {
    private final UserFindService userFindService;
    private final UserRegisterService userRegisterService;
    private final JwtService jwtService;


    public Map<String, String> processUserLogin(GoogleInfoDto googleInfoDto){
        User user = getOrCreateUser(googleInfoDto);
        Map<String ,String>stringStringMap = generateAuthTokens(user);
        log.info("acessToken, RefreshToken : {} ", stringStringMap);
        return stringStringMap;
    }

    private User getOrCreateUser(GoogleInfoDto googleInfoDto){
        return  userFindService.findUserByEmail(googleInfoDto.getEmail())
                .orElseGet
    }
}
