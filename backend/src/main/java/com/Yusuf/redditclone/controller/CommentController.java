package com.Yusuf.redditclone.controller;


import com.Yusuf.redditclone.DTO.CommentDTO;
import com.Yusuf.redditclone.model.Comments;
import com.Yusuf.redditclone.model.SaveCommentDTO;
import com.Yusuf.redditclone.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("comment/post")
    private void saveComment(@RequestBody SaveCommentDTO comments){
        commentService.saveComment(comments);

    }

    @GetMapping("/comment/post/{postId}")
    private List<CommentDTO> getCommentsByPost(@PathVariable int postId){
        return commentService.getCommentsByPost(postId);
    }
}
