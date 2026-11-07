package com.Yusuf.redditclone.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO{
    Long commentId;
    String userLogo;
    String userName;
    Instant commentedAt;
    String bodyHtml;
    String bodyText;
    int voteType;
    int totalVotes;
    List<CommentDTO> commentDTOList;
    Long parentId;
}
