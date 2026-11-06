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
            Null as mediaList,
            EXISTS
            (
                SELECT 1
                From saved_post sp where sp.user_id = :id
                and sp.post_id = p.id
            ) as isSaved,
            COALESCE(
                (
                    Select v.type from votes v
                    where v.user_id = :id and v.post_id = p.id
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
            
            FROM post p
            Inner Join user_account u ON p.author_id = u.id
            Inner Join community c ON p.community_id = c.id
            where u.id = :id
            ORDER BY p.id desc;
            """, nativeQuery = true)
    Slice<UserPostDTO> getUserPosts(int id, Pageable pageable);


}
