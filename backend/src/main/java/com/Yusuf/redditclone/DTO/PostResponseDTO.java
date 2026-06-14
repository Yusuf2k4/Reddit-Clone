package com.Yusuf.redditclone.DTO;

import com.Yusuf.redditclone.model.Media;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseDTO {
    String title;
    String bodyText;
    String bodyHtml;
    String name;
    String logo;
    List<MediaDTO> media;
    String userName;
    Long totalCount;
    Long userCount;
}
