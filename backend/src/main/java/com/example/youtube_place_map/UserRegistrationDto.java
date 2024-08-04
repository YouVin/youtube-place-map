package com.example.youtube_place_map;

import lombok.Data;
import org.springframework.context.annotation.Role;
import com.example.youtube_place_map.UserBaseInfo

@Data
public class UserRegistrationDto {
    private String email;
    private String nickname;
    private String profilePictureUrl;

    public UserRegistrationDto(String email, String nickname, String profilePictureUrl){
        this.email = email;
        this.nickname = nickname;
        this.profilePictureUrl = profilePictureUrl;
    }

    public User toEntity(){
        UserBaseInfo userBaseInfo = new UserBaseInfo(email, nickname, profilePictureUrl);
        return new User(userBaseInfo);
    }
}
