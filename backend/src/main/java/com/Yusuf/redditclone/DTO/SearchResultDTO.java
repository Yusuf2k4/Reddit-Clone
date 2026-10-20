package com.Yusuf.redditclone.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
public class SearchResultDTO {
    int id;
    String communityName;
    String communityLogo;
    String title;
    Instant createdAt;
    String mediaURL;
    float relevance;
}
