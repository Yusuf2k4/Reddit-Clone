package com.Yusuf.RedditClone.service;

import com.Yusuf.RedditClone.model.Tag;
import com.Yusuf.RedditClone.model.Topic;
import com.Yusuf.RedditClone.repository.TagRepository;
import com.Yusuf.RedditClone.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TopicService {

    @Autowired
    TopicRepository topicRepository;


    public ResponseEntity<?> getAllTopics() {
        try{
           List<Topic> topicList = topicRepository.findAll();
           return new ResponseEntity<>(topicList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("failed to fetch topics", HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }


}
