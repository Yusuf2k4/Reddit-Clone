package com.Yusuf.redditclone.DTO;

import lombok.Data;

import java.util.List;
@Data
public class UserRequestDTO {
    String userName;
    String email;
    String password;
    int age;
    String profilePicture;
    List<String> tagList;
}
