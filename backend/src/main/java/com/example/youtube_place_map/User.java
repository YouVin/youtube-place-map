package com.example.youtube_place_map;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "users")
@Getter
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded // UserBaseInfo를 포함하는 것을 명시
    private UserBaseInfo userBaseInfo;
}
