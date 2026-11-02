package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.DTO.CommunityPostsResponseDTO;
import com.Yusuf.redditclone.DTO.HomeFeedResponseDTO;
import com.Yusuf.redditclone.DTO.SearchResultDTO;
import com.Yusuf.redditclone.model.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {



    @Query("""
    SELECT new com.Yusuf.redditclone.DTO.CommunityPostsResponseDTO(
        p.id,
        p.bodyHtml,
        p.bodyText,
        p.createdAt,
        p.title,
        u.userName,
        CASE
            WHEN :id <> -1 AND EXISTS (
                SELECT 1
                FROM SavedPost sp
                WHERE sp.user.id = :id
                  AND sp.post.id = p.id
            )
            THEN true
            ELSE false
        END
    )
    FROM Post p
    INNER JOIN p.author u
    INNER JOIN p.community c
    WHERE c.name = :communityName
    ORDER BY p.createdAt DESC
    """)
    Slice<CommunityPostsResponseDTO> getPostByCommunity(String communityName, int id, Pageable pageable);

    @Query("Select c.id from Community c where name = :community")
    int getCommunityId(String community);


    @Query("""
    SELECT new com.Yusuf.redditclone.DTO.HomeFeedResponseDTO(
        p.id,
        c.name,
        c.logo,
        p.createdAt,
        p.title,
        p.bodyText,
        p.bodyHtml,
        CASE
            WHEN :id <> -1 AND EXISTS (
                SELECT 1
                FROM SavedPost sp
                WHERE sp.user.id = :id
                  AND sp.post.id = p.id
            )
            THEN true
            ELSE false
        END
    )
    FROM Post p
    INNER JOIN p.community c
    ORDER BY p.createdAt DESC
    """)
    Slice<HomeFeedResponseDTO> getHomeFeed(int id, Pageable pageable);


    @Query(value = """
    SELECT title
    FROM post
    WHERE title ILIKE CONCAT('%', :word, '%')
    ORDER BY
        CASE
            WHEN title ILIKE CONCAT(:word, '%') THEN 0
            ELSE 1
        END,
        title
    LIMIT 6
    """, nativeQuery = true)
    List<String> autocomplete(String word);

    @Query(value = """
            Select title from post
            LIMIT 6
            """, nativeQuery = true)

    List<String> fallbackAutocomplete();



    @Query(value = """
    SELECT p.id, c.name, c.logo, p.title, p.created_at,
         (
            SELECT m.media FROM media m
            WHERE m.post_id = p.id ORDER BY m.id LIMIT 1
         ) AS mediaURL,
        ts_rank(
            to_tsvector('english',
                COALESCE(p.title, '') || ' ' || COALESCE(p.body_text, '')
            ),
            websearch_to_tsquery('english', :searchWord)
        ) AS relevance
    FROM post p
    INNER JOIN community c ON p.community_id = c.id
    WHERE to_tsvector('english',
        COALESCE(p.title, '') || ' ' || COALESCE(p.body_text, '')
    ) @@ websearch_to_tsquery('english', :searchWord)
    ORDER BY relevance DESC
    
    
    """, nativeQuery = true)
    Slice<SearchResultDTO> getSearchResults( String searchWord, Pageable pageable);




    // select p.id,c.name,c.logo,p.created_at,p.title,p.body_text,p.body_html from post p INNER JOIN Community c
    //ON p.community_id = c.id;
}
