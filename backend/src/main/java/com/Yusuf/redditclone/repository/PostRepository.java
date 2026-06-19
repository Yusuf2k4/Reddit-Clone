package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.DTO.CommunityPostsResponseDTO;
import com.Yusuf.redditclone.DTO.HomeFeedResponseDTO;
import com.Yusuf.redditclone.model.Community;
import com.Yusuf.redditclone.model.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {



    @Query("SELECT new com.Yusuf.redditclone.DTO.CommunityPostsResponseDTO(p.id, p.bodyHtml, p.bodyText, p.createdAt, p.title, u.userName) " +
            "FROM Post p " +
            "INNER JOIN p.author u " +
            "INNER JOIN p.community c " +
            "WHERE c.name = :communityName " +
            "ORDER BY p.createdAt DESC " +
            "LIMIT 2")
    Slice<CommunityPostsResponseDTO> getPostByCommunity(String communityName, Pageable pageable);

    @Query("Select c.id from Community c where name = :community")
    int getCommunityId(String community);


    @Query("Select new com.Yusuf.redditclone.DTO.HomeFeedResponseDTO(p.id,c.name,c.logo,p.createdAt,p.title,p.bodyText,p.bodyHtml) " +
            "From Post p " +
            "Inner join p.community c " +
            "Order by p.createdAt DESC " +
            "Limit 2")
    Slice<HomeFeedResponseDTO> getHomeFeed(Pageable pageable);



    // select p.id,c.name,c.logo,p.created_at,p.title,p.body_text,p.body_html from post p INNER JOIN Community c
    //ON p.community_id = c.id;
}
