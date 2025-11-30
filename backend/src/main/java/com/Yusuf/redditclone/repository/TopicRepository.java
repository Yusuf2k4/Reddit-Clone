package com.Yusuf.redditclone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends JpaRepository<com.Yusuf.redditclone.model.Topic, Integer> {
}
