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
@Table(name = "user_account")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String userName;
    String email;
    String password;
    String gender;


    @CreatedDate
    Instant createdAt;

    @ManyToMany
    @JsonManagedReference
    List<Community> communityFollowing;

    @ManyToMany
    @JoinTable(name = "user_following")
    @JsonManagedReference
    List<User> following;

    @ManyToMany(mappedBy = "following")
    @JsonBackReference
    List<User> followers;

    @OneToMany(mappedBy = "author")
    @JsonBackReference
    List<Post> postList;

    @ManyToMany
    @JsonManagedReference
    List<Post> savedPost;

    @ManyToMany
    @JsonManagedReference
    List<Tag> tagList;



}
