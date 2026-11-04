package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.DTO.UserPostDTO;
import com.Yusuf.redditclone.repository.VotesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
public class VotesService {

    @Autowired
    VotesRepository votesRepository;

    @Autowired
    UserService userService;

    @Transactional
    public void upVotePost(int postId, int voteType) {
        int userId = userService.getUserId();
        if(userId == -1){
            return;
        }
        Integer existingVote = votesRepository.checkVoteType(postId, userId);
        if(voteType == 0){
            votesRepository.deleteVote(postId,userId);
        }
        else if(existingVote == null || existingVote != voteType){
            votesRepository.votePost(postId, voteType, userId);
        }

    }

    public Slice<UserPostDTO> getUpVotes(Pageable pageable) {
        int userId = userService.getUserId();
        if(userId == -1){
            return null;
        }
        return votesRepository.getUpVotes(pageable, userId);
    }

    public Slice<UserPostDTO> getDownVotes(Pageable pageable) {
        int userId = userService.getUserId();
        if(userId == -1){
            return null;
        }
        return votesRepository.getDownVotes(pageable, userId);
    }
}
