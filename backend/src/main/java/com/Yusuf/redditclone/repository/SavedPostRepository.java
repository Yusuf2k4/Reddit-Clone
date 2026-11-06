package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.DTO.UserPostDTO;
import com.Yusuf.redditclone.model.SavedPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedPostRepository extends JpaRepository<SavedPost, Integer> {

    @Modifying
    @Query(value = """
           DELETE from saved_post  
           Where user_id = :userId 
           And post_id = :postId
            """,nativeQuery = true)
    void deleteSavedPost(int postId, int userId);

    @Modifying
    @Query(value = """
            Insert into saved_post (user_id, post_id)
            VALUES (:userId, :postId)
            ON CONFLICT (user_id, post_id) DO NOTHING
            """, nativeQuery = true)
    void savePost(int postId, int userId);


    @Query(value = """
            Select Count(sp) from saved_post sp
            where sp.user_id = :userId
            and sp.post_id = :postId
            """,nativeQuery = true)
    int isSaved(int postId, int userId);



    @Query(value = """
            SELECT p.id, p.body_html, p.body_text, p.created_at, p.title, u.user_name, c.name, c.logo,
            (
            	Select m.media from media m
            	where p.id = m.post_id
            	ORDER BY m.id
            	LIMIT 1
            )as mediaURL,
            Null as mediaList,
            TRUE as is_saved,
            COALESCE(
                (
                    Select v.type from votes v
                    where v.user_id = :userId and v.post_id = p.id
                ),
                0
            ) as vote_type,
            COALESCE(
                (
                    SELECT SUM(v.type)
                    From votes v where v.post_id = p.id
                ),
                0
            ) as total_votes
            FROM post p Inner JOIN user_account u ON u.id = p.author_id
            INNER JOIN community c ON c.id = p.community_id
            inner JOIN saved_post sp ON p.id = sp.post_id
            where sp.user_id = :userId;
            
            
            """,nativeQuery = true)
    Slice<UserPostDTO> getSavedPost(int userId, Pageable pageable);


    boolean existsByUserIdAndPostId(int userId, int id);
}
