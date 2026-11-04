package com.Yusuf.redditclone.controller;

import com.Yusuf.redditclone.DTO.UserPostDTO;
import com.Yusuf.redditclone.service.VotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VotesController{

    @Autowired
    VotesService votesService;


    @PostMapping("/vote/{postId}/{voteType}")
    public void votePost(@PathVariable("postId") int postId, @PathVariable("voteType") int voteType){
        votesService.upVotePost(postId, voteType);
    }


    @GetMapping("/user/upVotes")
    public Slice<UserPostDTO> getUpVotes(Pageable pageable){
        return votesService.getUpVotes(pageable);
    }

    @GetMapping("/user/downVotes")
    public Slice<UserPostDTO> getDownVotes(Pageable pageable){
        return votesService.getDownVotes(pageable);
    }
}
