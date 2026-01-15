package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByCommunity_Name(String name);
}
