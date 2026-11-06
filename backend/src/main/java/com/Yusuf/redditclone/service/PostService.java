package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.DTO.*;
import com.Yusuf.redditclone.model.*;
import com.Yusuf.redditclone.repository.CommunityRepository;
import com.Yusuf.redditclone.repository.MediaRepository;
import com.Yusuf.redditclone.repository.PostRepository;
import com.Yusuf.redditclone.repository.SavedPostRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommunityRepository communityRepository;

    @Autowired
    MediaRepository mediaRepository;

    @Autowired
    SavedPostRepository savedPostRepository;

    @Autowired
    UserService userService;

    @Autowired
    MediaService mediaService;



    public int createPost(PostRequestDTO postRequestDTO) {

        Post newPost = new Post();
        newPost.setTitle(postRequestDTO.getTitle());
        newPost.setBodyText(postRequestDTO.getBodyText());
        newPost.setBodyHtml(postRequestDTO.getBodyHtml());
        String communityName = postRequestDTO.getCommunity();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal details= (UserPrincipal) auth.getPrincipal();
        User user = details.getUser();

        newPost.setAuthor(user);
        Community community = communityRepository.getByName(communityName);
        newPost.setCommunity(community);



        postRepository.save(newPost);

        if (postRequestDTO.getMedia() != null) {
            for(MediaDTO media: postRequestDTO.getMedia()){
                Media newMedia = new Media();
                newMedia.setType(media.getType());
                newMedia.setMedia(media.getMedia());
                newMedia.setPost(newPost);
                mediaRepository.save(newMedia);
            }
        }

        return newPost.getId();


    }

    public List<Post> getPosts() {

        return postRepository.findAll();
    }

    public UserPostDTO getPostById(int id) {
        int userId = userService.getUserId();
        UserPostDTO post = postRepository.getPostById(id,userId);
        List<MediaDTO> media = mediaRepository.getAllById(id);
        post.setMediaList(media);
        return post;
    }



    public Slice<UserPostDTO> getHomeFeed(Pageable pageable) {
        int userId = userService.getUserId();
        Slice<UserPostDTO> posts = postRepository.getHomePosts(userId);
        List<UserPostDTO> updatedPosts = posts.getContent();
        Map<Integer, UserPostDTO> map = new HashMap<>();

        for(UserPostDTO post: updatedPosts){
            map.put(post.getPostId(), post);
        }
        List<MediaDTO> mediaDTOList = communityRepository.getMediaWithPostIdIn(map.keySet().stream().toList());

        mediaService.mapMediaWithPost(map,mediaDTOList);


        return new SliceImpl<>(
                updatedPosts,
                posts.getPageable(),
                posts.hasNext()
        );
//
    }

    public List<String> autocomplete(String word) {
        return postRepository.autocomplete(word);
    }

    public List<String> fallbackAutocomplete() {
        return postRepository.fallbackAutocomplete();
    }

    public Slice<SearchResultDTO> getSearchResults(String searchWord, Pageable pageable) {
        List<SearchResultDTO> searchResultDTOS= new ArrayList<>();
        return postRepository.getSearchResults(searchWord, pageable);
    }




}

