package com.Yusuf.RedditClone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends JpaRepository<com.Yusuf.RedditClone.model.Topic, Integer> {
}
