package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.DTO.CommentDTO;
import com.Yusuf.redditclone.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comments, Integer> {


    @Query(value = """
            Select c.id, null as user_logo, u.user_name, c.commented_at, c.body_html, c.body_text, 0 as vote_type, 0 as total_votes,
            null as commentDTOList, c.parent_id
            From comments c
            Inner join user_account u ON u.id = c.user_id
            where c.post_id = :postId
            ORDER BY c.commented_at DESC;
            """, nativeQuery = true)
    List<CommentDTO> getCommentsByPost(int postId);



}
