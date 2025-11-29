package com.Yusuf.RedditClone.repository;

import com.Yusuf.RedditClone.model.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Integer> {
    Community getByName(String name);

    List<Community> findByNameContainingIgnoreCase(String communityName);
}
