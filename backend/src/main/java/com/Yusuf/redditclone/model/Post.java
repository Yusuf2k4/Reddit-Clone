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
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String bodyText;
    private String bodyHtml;

    @ElementCollection
    private List<Media> media;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

//    @ManyToMany(mappedBy = "savedPost")
//    @JsonBackReference
//    private List<User> savedBy;
//
//    @OneToMany(mappedBy = "post")
//    @JsonManagedReference
//    private List<Votes> votes;
}
