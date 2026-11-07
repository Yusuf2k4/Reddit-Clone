package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.DTO.UserPostDTO;
import com.Yusuf.redditclone.model.UserPrincipal;
import com.Yusuf.redditclone.repository.SavedPostRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedPostService {

    @Autowired
    SavedPostRepository savedPostRepository;

    @Autowired
    UserService userService;

    @Transactional
    public void toggleSavePost(int postId) {

        int userId = userService.getUserId();

        if(userId == -1){

            return;
        }
        int isSaved = savedPostRepository.isSaved(postId, userId);

        if(isSaved == 1){
            deleteSavedPost(postId, userId);
        }
        else{
            savePost(postId, userId);
        }
    }

    private void deleteSavedPost(int postId, int userId) {
        savedPostRepository.deleteSavedPost(postId, userId);
    }

    private void savePost(int postId, int userId) {
        savedPostRepository.savePost(postId, userId);
    }

    public Slice<UserPostDTO> getSavedPost(Pageable pageable) {
        int userId = userService.getUserId();
        return savedPostRepository.getSavedPost(userId, pageable);
    }
}
