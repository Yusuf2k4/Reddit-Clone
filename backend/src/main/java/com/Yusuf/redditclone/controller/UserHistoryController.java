package com.Yusuf.redditclone.controller;

import com.Yusuf.redditclone.DTO.UserPostDTO;
import com.Yusuf.redditclone.service.UserHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserHistoryController {

    @Autowired
    UserHistoryService userHistoryService;

    @PostMapping("/history/user/{postId}")
    public void postHistory(@PathVariable int postId){
        userHistoryService.postHistory(postId);
    }


    @GetMapping("/user/history")
    public List<UserPostDTO> getHistory(){
        return  userHistoryService.getHistory();
    }
}
