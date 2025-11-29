package com.Yusuf.RedditClone.controller;

import com.Yusuf.RedditClone.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TopicController {

    @Autowired
    TopicService topicService;
    @GetMapping("/topic")
    public ResponseEntity<?> getAllTopics(){
        return topicService.getAllTopics();
    }



}
