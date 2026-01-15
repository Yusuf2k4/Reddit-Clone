package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.DTO.topicDTO;
import com.Yusuf.redditclone.model.Tag;
import com.Yusuf.redditclone.model.Topic;
import com.Yusuf.redditclone.repository.TopicRepository;
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


    public void postTopics(List<topicDTO> topicDTOS) {
        for(int i = 0; i < topicDTOS.size(); i++){
            Topic topic = new Topic();
            String topicName = topicDTOS.get(i).getTopic();
            topic.setName(topicName);
            ArrayList<Tag> tags = new ArrayList<>();
            for(String tag: topicDTOS.get(i).getTags()){
                Tag newTag = new Tag();
                newTag.setName(tag);
                newTag.setTopic(topic);
                tags.add(newTag);
            }
            topic.setTags(tags);

            topicRepository.save(topic);

        }

    }
}
