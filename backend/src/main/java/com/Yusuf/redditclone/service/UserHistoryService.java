package com.Yusuf.redditclone.service;


import com.Yusuf.redditclone.DTO.UserPostDTO;
import com.Yusuf.redditclone.repository.UserHistoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class UserHistoryService {
    @Autowired
    UserHistoryRepository userHistoryRepository;

    @Autowired
    UserService userService;

    @Transactional
    public void postHistory(int postId) {
        // Insert new post
        // update lasVisitedAt if post is already visited
        // 11th post -> remove the oldest visited post

        int userId = userService.getUserId();
        if(userId == -1){
            System.out.println("DENIED");
            return;
        }
        userHistoryRepository.upsert(userId, postId, Instant.now());
        
        int count = userHistoryRepository.countByUserId(userId);
        if(count > 10){
            userHistoryRepository.deleteOldestByUserId(userId);
        }


    }

    public List<UserPostDTO> getHistory() {
        int userId = userService.getUserId();
        if(userId == -1){
            return null;
        }
        return userHistoryRepository.getHistory(userId);
    }

//    public UserPostDTO getHistory(){
//
//    }
}
