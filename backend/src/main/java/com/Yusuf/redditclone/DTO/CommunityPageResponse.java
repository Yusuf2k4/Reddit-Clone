package com.Yusuf.redditclone.DTO;

import com.Yusuf.redditclone.model.Media;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.List;

@Data

public class CommunityPageResponse {
    private int id;
    private String name;
    private String description;
    private Instant createdAt;
    private String logo;
    private String banner;


}
