package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.model.Topic;
import com.Yusuf.redditclone.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
