package com.Yusuf.RedditClone.DTO;

import com.Yusuf.RedditClone.model.Post;
import com.Yusuf.RedditClone.model.Tag;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommunityDTO {
    String name;
    String description;
    String logo;
    String banner;
    List<String> tagList;
}
