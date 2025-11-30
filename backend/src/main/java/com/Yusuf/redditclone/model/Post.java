package com.Yusuf.redditclone.model;

import com.Yusuf.redditclone.DTO.Media;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @ManyToOne
    @JsonManagedReference
    User author;

    @ManyToMany(mappedBy = "savedPost")
    @JsonBackReference
    List<User> savedBy;
}
