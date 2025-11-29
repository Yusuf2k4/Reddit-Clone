package com.Yusuf.RedditClone.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostRequestDTO {
    String title;
    String bodyText;
    String bodyHtml;
    List<Media> media;
    String community;
    String createdBy;
}
