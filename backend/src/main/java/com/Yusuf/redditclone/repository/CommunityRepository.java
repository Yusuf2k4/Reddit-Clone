package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.DTO.*;
import com.Yusuf.redditclone.model.Community;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Integer> {

    Community getByName(String name);

    List<Community> findByNameContainingIgnoreCase(String communityName);


    @Query(value = """
    SELECT id,logo,name
    FROM community
    WHERE LOWER(name) LIKE LOWER(CONCAT('%', :communityName, '%'))
    LIMIT 6
    """, nativeQuery = true)
    List<CommunitiesResponseDTO> searchCommunities(String communityName);

    @Query(value = """
    SELECT id,logo,name
    FROM community
    LIMIT 6
    """, nativeQuery = true)
    List<CommunitiesResponseDTO> fallbackCommunities();


    @Query(value = """
            SELECT id, name, logo, description
            FROM community
            Where name ILIKE CONCAT('%', :name,'%')
            ORDER BY
                CASE
                    WHEN name ILIKE CONCAT(:name, '%') THEN 0
                    ELSE 1
                END,
                name
            """, nativeQuery = true)
    Slice<CommunitySearchDTO> getCommunitySearchResult(String name, Pageable pageable);


    @Query(value = """
            SELECT p.id, p.body_html, p.body_text, p.created_at, p.title, u.user_name, c.name, c.logo, Null as mediaURL,Null as mediaList,
            EXISTS
            (
                SELECT 1
                FROM saved_post sp
                WHERE sp.user_id = :id
                AND sp.post_id = p.id
            ) as is_saved,

            COALESCE(
            (
                Select v.type
                From votes v
                where v.post_id = p.id and v.user_id = :id
            ),0) as voteType,
            COALESCE(
            (
                Select SUM(v.type) from votes v
                where v.post_id = p.id
            ),0) as total_votes
            FROM Post p
            INNER JOIN user_account u ON p.author_id = u.id
            INNER JOIN community c ON p.community_id = c.id
            WHERE c.name = :communityName
            ORDER BY p.created_at DESC;
    """, nativeQuery = true)
    Slice<UserPostDTO> getPostByCommunity(String communityName, int id, Pageable pageable);

    @Query(value = """
            Select type, media, post_id from media where post_id in (:postIds)
            """,nativeQuery = true)
    List<MediaDTO> getMediaWithPostIdIn(List<Integer> postIds);
}
