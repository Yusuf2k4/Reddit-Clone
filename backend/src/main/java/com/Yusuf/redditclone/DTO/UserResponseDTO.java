package com.Yusuf.redditclone.DTO;

import com.Yusuf.redditclone.model.Community;
import com.Yusuf.redditclone.model.Post;
import com.Yusuf.redditclone.model.Tag;
import lombok.Data;

import java.util.List;

@Data
public class UserResponseDTO {
    String userName;
    String email;
    String gender;
    List<String> tags;
}
