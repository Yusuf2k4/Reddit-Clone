package com.Yusuf.RedditClone.service;

import com.Yusuf.RedditClone.DTO.PostRequestDTO;
import com.Yusuf.RedditClone.DTO.PostResponseDTO;
import com.Yusuf.RedditClone.model.Community;
import com.Yusuf.RedditClone.model.Post;
import com.Yusuf.RedditClone.repository.CommunityRepository;
import com.Yusuf.RedditClone.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommunityRepository communityRepository;
    public int createPost(PostRequestDTO postRequestDTO){

        Post newPost = new Post();
        newPost.setTitle(postRequestDTO.getTitle());
        newPost.setBodyText(postRequestDTO.getBodyText());
        newPost.setBodyHtml(postRequestDTO.getBodyHtml());
        newPost.setCreatedBy(postRequestDTO.getCreatedBy());

        if(postRequestDTO.getMedia() == null){
            newPost.setMedia(new ArrayList<>());
        }
        else{
            newPost.setMedia(postRequestDTO.getMedia());
        }

        String communityName = postRequestDTO.getCommunity();
        Community community = communityRepository.getByName(communityName);
        newPost.setCommunity(community);

        postRepository.save(newPost);

        if(community != null){
            List<Post> postList = community.getPostList();
            postList.add(newPost);
           communityRepository.save(community);

        }
        return newPost.getId();


    }

    public List<Post> getPosts() {

        return postRepository.findAll();
    }

    public PostResponseDTO getPostById(int id) {
         Post post = postRepository.findById(id).orElse(null);

         if(post != null){
             PostResponseDTO postResponseDTO = new PostResponseDTO();
             postResponseDTO.setTitle(post.getTitle());
             postResponseDTO.setCommunity(post.getCommunity().getName());
             postResponseDTO.setBodyHtml(post.getBodyHtml());
             postResponseDTO.setBodyText(post.getBodyText());
             postResponseDTO.setCreatedBy(post.getCreatedBy());
             postResponseDTO.setLogo(post.getCommunity().getLogo());
             postResponseDTO.setMedia(post.getMedia());

             return postResponseDTO;

         }
        System.out.println();
         return new PostResponseDTO();
    }
}
