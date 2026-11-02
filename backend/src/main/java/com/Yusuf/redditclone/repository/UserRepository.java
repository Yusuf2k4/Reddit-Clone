package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.DTO.UserPostDTO;
import com.Yusuf.redditclone.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserNameOrEmail(String username, String email);


    Optional<User> findByEmail(String email);


    @Query(value = """
            select p.id, p.body_html, p.body_text, p.created_at, p.title, u.user_name, c.name, c.logo,
            (
            	SELECT m.media
            	from media m
            	where m.post_id = p.id
            	Order BY m.id limit 1
            
            ) As media_url,
            EXISTS 
            (
                SELECT 1 
                From saved_post sp where sp.user_id = :id  
                and sp.post_id = p.id
            ) as isSaved
            
        
            
            FROM post p
            Inner Join user_account u ON p.author_id = u.id
            Inner Join community c ON p.community_id = c.id
            where u.id = :id
            ORDER BY p.id desc;
            """, nativeQuery = true)
    Slice<UserPostDTO> getUserPosts(int id, Pageable pageable);


}
