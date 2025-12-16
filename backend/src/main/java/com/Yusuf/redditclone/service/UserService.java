package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.DTO.UserLoginRequestDTO;
import com.Yusuf.redditclone.DTO.UserRequestDTO;
import com.Yusuf.redditclone.DTO.UserResponseDTO;
import com.Yusuf.redditclone.model.Tag;
import com.Yusuf.redditclone.model.User;
import com.Yusuf.redditclone.repository.TagRepository;
import com.Yusuf.redditclone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
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
        String password = userRequestDTO.getPassword();

        Tag tag= new Tag();
        User user = new User();
        user.setUserName(userRequestDTO.getUserName());
        user.setEmail(userRequestDTO.getEmail());
        user.setGender(userRequestDTO.getGender());
        user.setPassword(encoder.encode(password));
        user.setProvider("LOCAL");
        user.setCommunityFollowing(new ArrayList<>());
        user.setFollowers(new ArrayList<>());
        user.setFollowing(new ArrayList<>());
        user.setPostList(new ArrayList<>());
        user.setSavedPost(new ArrayList<>());

        List<Tag> tagList = new ArrayList<>();
        for(String tags: userRequestDTO.getTags()){
            Tag findtag = tagRepository.findByName(tags);
            tagList.add(findtag);
        }
        user.setTagList(tagList);

        userRepository.save(user);
        return "Success";


    }

    public ResponseEntity<?> getUser(UserDetails user) {
        User user1 = userRepository.findByUserNameOrEmail(user.getUsername(),user.getUsername());
        if(user1 == null){
            return new ResponseEntity<>("Wrong credentials", HttpStatus.NOT_FOUND);
        }
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setUserName(user1.getUserName());
        userResponseDTO.setEmail(user1.getEmail());
        userResponseDTO.setGender(user1.getGender());
        List<Tag> tagList = user1.getTagList();
        List<String> userTags = new ArrayList<>();
        for(Tag t: tagList){
            userTags.add(t.getName());
        }
        userResponseDTO.setTags(userTags);
        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
    }
}
