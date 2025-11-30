package com.Yusuf.redditclone.controller;

import com.Yusuf.redditclone.service.TopicService;
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
