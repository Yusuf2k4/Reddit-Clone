package com.Yusuf.RedditClone.repository;

import com.Yusuf.RedditClone.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {
}
