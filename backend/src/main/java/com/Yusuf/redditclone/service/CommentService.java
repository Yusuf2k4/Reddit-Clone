package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.DTO.CommentDTO;
import com.Yusuf.redditclone.model.Comments;
import com.Yusuf.redditclone.model.Post;
import com.Yusuf.redditclone.model.SaveCommentDTO;
import com.Yusuf.redditclone.model.User;
import com.Yusuf.redditclone.repository.CommentRepository;
import com.Yusuf.redditclone.repository.PostRepository;
import com.Yusuf.redditclone.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Transactional
    public void saveComment(SaveCommentDTO commentBody) {
        Comments comment = new Comments();
        int userId = userService.getUserId();
        if(userId == -1){
            return;
        }

        Post post = postRepository.findById(commentBody.getPostId()).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        Comments parent = commentRepository.findById(commentBody.getParentId()).orElse(null);


        comment.setBodyHtml(commentBody.getBodyHtml());
        comment.setBodyText(commentBody.getBodyText());
        comment.setPost(post);
        comment.setUser(user);
        comment.setParent(parent);
        comment.setCommentedAt(Instant.now());


        commentRepository.save(comment);
    }

    public List<CommentDTO> getCommentsByPost(int postId) {
        List<CommentDTO> comments = commentRepository.getCommentsByPost(postId);
        Map<Long, CommentDTO> map = new HashMap<>();

        for(CommentDTO commentDTO: comments){
            map.put(commentDTO.getCommentId(), commentDTO);
        }

        List<CommentDTO> rootComments = new ArrayList<>();
        for(CommentDTO commentDTO: comments){
            if(commentDTO.getParentId() == null){
                rootComments.add(commentDTO);
            }
            else{
                CommentDTO parent = map.get(commentDTO.getParentId());
                if(parent.getCommentDTOList() == null){
                    parent.setCommentDTOList(new ArrayList<>());
                }
                parent.getCommentDTOList().add(commentDTO);
                
            }
        }
        return rootComments;


    }
}
