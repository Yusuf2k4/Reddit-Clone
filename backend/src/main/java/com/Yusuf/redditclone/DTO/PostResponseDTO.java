package com.Yusuf.redditclone.DTO;

import lombok.Data;

import java.util.List;

@Data
public class PostResponseDTO {
    String title;
    String bodyText;
    String bodyHtml;
    String community;
    String logo;
    List<Media> media;
    String createdBy;
    int totalCount;
    int userCount;
}
