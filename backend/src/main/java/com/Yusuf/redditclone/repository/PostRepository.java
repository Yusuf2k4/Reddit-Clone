package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.DTO.CommunityPostsResponseDTO;
import com.Yusuf.redditclone.DTO.HomeFeedResponseDTO;
import com.Yusuf.redditclone.DTO.SearchResultDTO;
import com.Yusuf.redditclone.DTO.UserPostDTO;
import com.Yusuf.redditclone.model.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {





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



    @Query(value = """
            select p.id, p.body_html, p.body_text, p.created_at, p.title, u.user_name, c.name, c.logo,\s
            NULL as mediaURL,
            NULL as mediaList,
            EXISTS
            (
            	Select 1 from saved_post sp
            	where sp.user_id = :userId and sp.post_id = p.id
            ) as is_saved,
            COALESCE (
            		(Select v.type from votes v
            		where v.user_id = :userId and v.post_id = p.id),
            0) as vote_type,
            
            
            COALESCE(
            	(
            	Select Sum(v.type) from votes v
            	where v.post_id = p.id
            	)
            ,0) as totalVotes
            From post p
            Inner join community c ON p.community_id = c.id
            Inner join user_account u On p.author_id = u.id
            where p.id = :postId;
            
            
            """,nativeQuery = true)
    UserPostDTO getPostById(int postId, int userId);



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
            ORDER BY p.created_at DESC;
            """, nativeQuery = true)
    Slice<UserPostDTO> getHomePosts(int id);


    // select p.id,c.name,c.logo,p.created_at,p.title,p.body_text,p.body_html from post p INNER JOIN Community c
    //ON p.community_id = c.id;
}
