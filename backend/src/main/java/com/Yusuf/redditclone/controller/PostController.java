package com.Yusuf.redditclone.controller;

import com.Yusuf.redditclone.DTO.*;
import com.Yusuf.redditclone.model.Post;
import com.Yusuf.redditclone.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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

    @GetMapping("/post/community/{community}")
    public Slice<CommunityPostsResponseDTO> getPostByCommunity(@PathVariable String community, Pageable pageable){
        return postService.getPostsByCommunity( community, pageable);
    }

    @GetMapping("/posts")
    public Slice<HomeFeedResponseDTO> getHomeFeed(Pageable pageable){
        return postService.getHomeFeed(pageable);
    }
//    @GetMapping("/{communityName}/posts")
//    public List<PostResponseDTO> getPostsByCommunityName(@PathVariable("communityName") String name){
//        return postService.getPostByCommunityName(name);
//    }

//    @GetMapping("/posts")
//    public List<Post> getAllPosts(){
//        return postService.getPosts();
//    }

}
