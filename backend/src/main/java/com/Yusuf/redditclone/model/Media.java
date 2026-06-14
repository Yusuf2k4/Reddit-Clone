package com.Yusuf.redditclone.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String type;
    String media;

    @ManyToOne
    @JoinColumn(name = "post_id")
    Post post;

}
