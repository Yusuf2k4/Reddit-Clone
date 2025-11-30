package com.Yusuf.redditclone.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
