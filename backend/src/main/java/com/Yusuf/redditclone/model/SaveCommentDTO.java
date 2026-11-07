package com.Yusuf.redditclone.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveCommentDTO {
    String bodyHtml;
    String bodyText;
    int postId;
    int parentId;
}
