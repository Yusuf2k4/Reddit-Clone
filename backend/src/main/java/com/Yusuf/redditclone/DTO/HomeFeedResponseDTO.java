package com.Yusuf.redditclone.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class HomeFeedResponseDTO {
    private int id;
    private String communityName;
    private String communityLogo;
    private Instant createdAt;
    private String title;
    private String bodyText;
    private String bodyHtml;
    private List<MediaDTO> mediaDTOList;

    public HomeFeedResponseDTO(int id, String communityName, String communityLogo, Instant createdAt, String title, String bodyText, String bodyHtml) {
        this.id = id;
        this.communityName = communityName;
        this.communityLogo = communityLogo;
        this.createdAt = createdAt;
        this.title = title;
        this.bodyText = bodyText;
        this.bodyHtml = bodyHtml;
    }
}
