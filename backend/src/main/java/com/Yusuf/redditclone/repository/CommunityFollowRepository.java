package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.model.CommunityFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityFollowRepository extends JpaRepository<CommunityFollow, Integer> {
}
