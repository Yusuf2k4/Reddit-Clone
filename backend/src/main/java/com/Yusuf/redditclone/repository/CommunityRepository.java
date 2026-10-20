package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.DTO.CommunitiesResponseDTO;
import com.Yusuf.redditclone.DTO.CommunityPageResponse;
import com.Yusuf.redditclone.DTO.CommunityPostsResponseDTO;
import com.Yusuf.redditclone.DTO.CommunitySearchDTO;
import com.Yusuf.redditclone.model.Community;
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
            LIMIT 6
            """, nativeQuery = true)
    List<CommunitySearchDTO> getCommunitySearchResult(String name);

}
