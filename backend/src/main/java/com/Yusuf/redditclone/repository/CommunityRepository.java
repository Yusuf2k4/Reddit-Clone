package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.model.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Integer> {
    Community getByName(String name);

    List<Community> findByNameContainingIgnoreCase(String communityName);
}
