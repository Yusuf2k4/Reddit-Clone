package com.Yusuf.RedditClone.DTO;

import com.Yusuf.RedditClone.model.Community;
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
}
