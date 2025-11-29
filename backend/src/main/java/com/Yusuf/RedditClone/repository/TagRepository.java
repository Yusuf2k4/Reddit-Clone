package com.Yusuf.RedditClone.repository;

import com.Yusuf.RedditClone.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    Tag findByName(String tag);
}
