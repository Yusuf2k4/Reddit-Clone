package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.DTO.CommunityPageResponse;
import com.Yusuf.redditclone.model.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Integer> {

    Community getByName(String name);

    List<Community> findByNameContainingIgnoreCase(String communityName);



}
