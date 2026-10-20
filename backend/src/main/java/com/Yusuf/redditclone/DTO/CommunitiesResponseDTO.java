package com.Yusuf.redditclone.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommunitiesResponseDTO {
    int id;
    String logo;
    String name;
}
