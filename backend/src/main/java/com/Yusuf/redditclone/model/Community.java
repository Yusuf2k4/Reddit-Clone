package com.Yusuf.redditclone.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    String description;
    @CreatedDate
    Instant createdAt;
    String logo;
    String banner;

    @ManyToMany(mappedBy = "communityFollowing")
    @JsonBackReference
    List<User> userFollowing;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JsonManagedReference
    List<Post> postList;

    @ManyToMany
    List<Tag> tagList;
}
