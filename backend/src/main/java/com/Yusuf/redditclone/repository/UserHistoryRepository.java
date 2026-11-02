package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.DTO.UserPostDTO;
import com.Yusuf.redditclone.model.UserHistory;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface UserHistoryRepository extends JpaRepository<UserHistory,Integer> {

    @Modifying
    @Query(value = """
        INSERT INTO user_history (user_id, post_id, last_visited_at)
        VALUES (:userId, :postId, :now)
        ON CONFLICT (user_id, post_id)
        DO UPDATE SET last_visited_at = EXCLUDED.last_visited_at
            """, nativeQuery = true)
    void upsert(int userId, int postId, Instant now);


    UserHistory findByUserIdAndPostId(int userId, int postId);

    int countByUserId(int userId);

    @Modifying
    @Transactional
    @Query(value = """
            DELETE from user_history
            where id = (
                Select id From user_history
                where user_id = :userId
                Order By last_visited_at ASC, id ASC
                LIMIT 1
            )
            
            """, nativeQuery = true)
    void deleteOldestByUserId(int userId);



    @Query(value = """
            select p.id, p.body_html, p.body_text, p.created_at, p.title, u.user_name, c.name, c.logo,
             (
                Select m.media from media m
                where m.post_id = p.id
                ORDER BY m.id ASC
                LIMIT 1
             ) as mediaURL,
             CASE
                WHEN EXISTS (
                    SELECT 1 from saved_post sp
                    where sp.post_id = p.id AND sp.user_id = 2
                )
                THEN true
                ELSE false
             END as is_Saved
             From user_history uh INNER JOIN post p ON p.id = uh.post_id
             Inner join community c ON p.community_id = c.id
             Inner join user_account u ON u.id = p.author_id
             where uh.user_id = 2
             ORDER BY uh.last_visited_at DESC;
            """,nativeQuery = true)
    List<UserPostDTO> getHistory(int userId);
}
