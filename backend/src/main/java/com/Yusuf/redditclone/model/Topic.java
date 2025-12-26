package com.Yusuf.redditclone.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.PERSIST, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Tag> tags;

}
