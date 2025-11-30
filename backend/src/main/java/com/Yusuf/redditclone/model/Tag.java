package com.Yusuf.redditclone.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String name;

    @ManyToOne
    @JsonBackReference
    Topic topic;

    @ManyToMany(mappedBy = "tagList")
    @JsonIgnore
    List<Community> communityList;

    @ManyToMany(mappedBy = "tagList")
    @JsonIgnore
    List<User> userList;
}
