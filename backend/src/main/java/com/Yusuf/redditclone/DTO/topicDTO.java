package com.Yusuf.redditclone.DTO;

import lombok.Data;

import java.util.List;

@Data
public class topicDTO {
    String topic;
    List<String> tags;
}
