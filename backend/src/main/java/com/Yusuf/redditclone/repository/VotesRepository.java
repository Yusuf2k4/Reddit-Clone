package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.DTO.UserPostDTO;
import com.Yusuf.redditclone.model.Votes;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VotesRepository extends JpaRepository<Votes, Integer> {


    @Modifying
    @Query(value = """
           Insert into votes (type,post_id,user_id)
           Values (:voteType, :postId, :userId)
           ON CONFLICT (post_id, user_id)
           DO UPDATE SET type = EXCLUDED.type
           """, nativeQuery = true)

    void votePost(int postId, int voteType, int userId);


    @Query(value = """
            Select type from Votes v
            where v.post.id = :postId AND v.user.id = :userId
            """)
    Integer checkVoteType(int postId, int userId);


    @Modifying
    @Query(value = """
            Delete from Votes v
            where v.user.id = :userId AND v.post.id = :postId
            """)
    void deleteVote(int postId, int userId);


    @Query(value = """
            SELECT p.id, p.body_html, p.body_text, p.created_at, p.title, u.user_name, c.name, c.logo,
            (
                SELECT m.media FROM media m
                WHERE m.post_id = p.id
                ORDER BY m.id
                LIMIT 1
            ) AS mediaURL,
            Null as mediaList,
            EXISTS
            (
                SELECT 1
                FROM saved_post sp
                WHERE sp.user_id = :userId
                AND sp.post_id = p.id
            ) AS isSaved,
            uv.type AS vote_type,
            COALESCE(
            (
                SELECT SUM(v.type)
                FROM votes v
                WHERE v.post_id = p.id
            ),
            0
            ) AS total_votes
            FROM Post p
            INNER JOIN Community c ON p.community_id = c.id
            INNER JOIN user_account u ON u.id = p.author_id
            INNER JOIN votes uv ON uv.post_id = p.id
                AND uv.user_id = :userId
                AND uv.type = 1
            ORDER BY p.created_at DESC;
            """,nativeQuery = true)
    Slice<UserPostDTO> getUpVotes(Pageable pageable, int userId);



    @Query(value = """
            SELECT p.id, p.body_html, p.body_text, p.created_at, p.title, u.user_name, c.name, c.logo,
            (
                SELECT m.media FROM media m
                WHERE m.post_id = p.id
                ORDER BY m.id
                LIMIT 1
            ) AS mediaURL,
            Null as mediaList,
            EXISTS
            (
                SELECT 1
                FROM saved_post sp
                WHERE sp.user_id = :userId
                AND sp.post_id = p.id
            ) AS isSaved,
            uv.type AS vote_type,
            COALESCE(
            (
                SELECT SUM(v.type)
                FROM votes v
                WHERE v.post_id = p.id
            ),
            0
            ) AS total_votes
            FROM Post p
            INNER JOIN Community c ON p.community_id = c.id
            INNER JOIN user_account u ON u.id = p.author_id
            INNER JOIN votes uv ON uv.post_id = p.id
                AND uv.user_id = :userId
                AND uv.type = -1
            ORDER BY p.created_at DESC;
            """,nativeQuery = true)
    Slice<UserPostDTO> getDownVotes(Pageable pageable, int userId);
}
