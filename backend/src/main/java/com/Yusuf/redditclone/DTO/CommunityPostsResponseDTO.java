package com.Yusuf.redditclone.DTO;

import com.Yusuf.redditclone.model.Media;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommunityPostsResponseDTO {

    public CommunityPostsResponseDTO(int id, String bodyHtml, String bodyText,  Instant createdAt, String title, String userName) {
        this.id = id;
        this.bodyHtml = bodyHtml;
        this.bodyText = bodyText;
        this.createdAt = createdAt;
        this.title = title;
        this.userName = userName;

    }

    private int id;
    private String bodyHtml;
    private String bodyText;
    private Instant createdAt;
    private String title;
    private String userName;
    private List<MediaDTO> mediaResponseDTOList;


}
