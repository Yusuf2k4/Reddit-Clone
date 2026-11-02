package com.Yusuf.redditclone.controller;

import com.Yusuf.redditclone.DTO.UserPostDTO;
import com.Yusuf.redditclone.service.SavedPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SavedPostController {
    @Autowired
    SavedPostService savedPostService;


    @PostMapping("/post/save/{postId}")
    public void savePost(@PathVariable int postId){
        savedPostService.toggleSavePost(postId);
    }

    @GetMapping("/saved/post")
    public Slice<UserPostDTO> getSavedPost(Pageable pageable){
        return savedPostService.getSavedPost(pageable);
    }

}
