package com.Yusuf.redditclone.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPostDTO {
    int postId;
    String bodyHtml;
    String bodyText;
    Instant createdAt;
    String title;
    String userName;
    String communityName;
    String communityLogo;
    String mediaURL;
    Boolean isSaved;
}
