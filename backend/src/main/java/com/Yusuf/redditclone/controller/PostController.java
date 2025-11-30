package com.Yusuf.redditclone.controller;

import com.Yusuf.redditclone.DTO.PostRequestDTO;
import com.Yusuf.redditclone.DTO.PostResponseDTO;
import com.Yusuf.redditclone.model.Post;
import com.Yusuf.redditclone.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/create/post")
    public int createPost(@RequestBody PostRequestDTO postRequestDTO){
        return postService.createPost(postRequestDTO);
    }

    @GetMapping("/post/{id}")
    public PostResponseDTO getPostById(@PathVariable int id){
        return postService.getPostById(id);
    }
    @GetMapping("/posts")
    public List<Post> getPosts(){
        return postService.getPosts();
    }
}
