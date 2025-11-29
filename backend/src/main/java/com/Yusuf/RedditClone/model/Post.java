package com.Yusuf.RedditClone.model;

import com.Yusuf.RedditClone.DTO.Media;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.Instant;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String title;
    String bodyText;
    String bodyHtml;
    @ElementCollection
    List<Media> media;
    @CreatedDate
    Instant createdAt;
    @LastModifiedDate
    Instant updatedAt;
    @ManyToOne
    @JsonBackReference
    Community community;
    String createdBy;
}
