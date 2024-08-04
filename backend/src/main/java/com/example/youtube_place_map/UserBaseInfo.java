package com.example.youtube_place_map;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Embeddable
@Slf4j
@Getter
public class UserBaseInfo {
    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Column(length = 30)
    private String nickname;

    private String profilePictureUrl;
}

