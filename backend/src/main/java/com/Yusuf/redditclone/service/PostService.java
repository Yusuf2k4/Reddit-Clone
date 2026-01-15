package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.DTO.PostRequestDTO;
import com.Yusuf.redditclone.DTO.PostResponseDTO;
import com.Yusuf.redditclone.model.Community;
import com.Yusuf.redditclone.model.Post;
import com.Yusuf.redditclone.repository.CommunityRepository;
import com.Yusuf.redditclone.repository.PostRepository;
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


        if(postRequestDTO.getMedia() == null){
            newPost.setMedia(new ArrayList<>());
        }
        else{
            newPost.setMedia(postRequestDTO.getMedia());
        }

        String communityName = postRequestDTO.getCommunity();
        Community community = communityRepository.getByName(communityName);
        newPost.setCommunity(community);
        System.out.println("In Posts");
        postRepository.save(newPost);

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
             postResponseDTO.setCreatedBy("u/wholesome");
             postResponseDTO.setLogo(post.getCommunity().getLogo());
             postResponseDTO.setMedia(post.getMedia());
             return postResponseDTO;

         }

         return new PostResponseDTO();
    }

    public List<PostResponseDTO> getPostByCommunityName(String name) {
        List<Post> post =  postRepository.findByCommunity_Name(name);
        
    }
}
