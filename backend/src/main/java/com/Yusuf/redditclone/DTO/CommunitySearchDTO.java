package com.Yusuf.redditclone.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommunitySearchDTO {
    int id;
    String name;
    String logo;
    String description;
}
