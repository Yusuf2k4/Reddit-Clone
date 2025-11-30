package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.DTO.UserLoginRequestDTO;
import com.Yusuf.redditclone.DTO.UserRequestDTO;
import com.Yusuf.redditclone.model.Tag;
import com.Yusuf.redditclone.model.User;
import com.Yusuf.redditclone.repository.TagRepository;
import com.Yusuf.redditclone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    TagRepository tagRepository;

    @Autowired
    UserRepository userRepository;



    public String registerUser(UserRequestDTO userRequestDTO) {
        Tag tag= new Tag();
        User user = new User();
        user.setUserName(userRequestDTO.getUserName());
        user.setEmail(userRequestDTO.getEmail());
        user.setAge(userRequestDTO.getAge());
        user.setProfilePicture(userRequestDTO.getProfilePicture());
        user.setPassword(encoder.encode(userRequestDTO.getPassword()));
        user.setCommunityFollowing(new ArrayList<>());
        user.setFollowers(new ArrayList<>());
        user.setFollowing(new ArrayList<>());
        user.setPostList(new ArrayList<>());
        user.setSavedPost(new ArrayList<>());

        List<Tag> tagList = new ArrayList<>();
        for(String tags: userRequestDTO.getTagList()){
            Tag findtag = tagRepository.findByName(tags);
            tagList.add(findtag);
        }
        user.setTagList(tagList);

        userRepository.save(user);
        return "Success";


    }

}
