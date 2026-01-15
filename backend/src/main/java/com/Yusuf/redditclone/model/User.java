package com.Yusuf.redditclone.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "user_account")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    private String userName;
    private String email;
    private String password;
    private String gender;
    private String provider;

    @CreatedDate
    private Instant createdAt;

    @ManyToMany
    @JsonManagedReference
    private List<Tag> tagList;

    
//    @ManyToMany
//    @JsonManagedReference
//    private List<Community> communityFollowing;
//
//    @ManyToMany
//    @JoinTable(name = "user_following")
//    @JsonManagedReference
//    private List<User> following;
//
//    @ManyToMany(mappedBy = "following")
//    @JsonBackReference
//    private List<User> followers;
//
//    @OneToMany(mappedBy = "author")
//    @JsonBackReference
//    private List<Post> postList;
//
//    @ManyToMany
//    @JsonManagedReference
//    private List<Post> savedPost;




//    @OneToMany(mappedBy = "user")
//    @JsonManagedReference
//    private List<Votes> votes;





}
