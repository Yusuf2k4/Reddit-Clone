package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.DTO.*;
import com.Yusuf.redditclone.model.*;
import com.Yusuf.redditclone.repository.CommunityRepository;
import com.Yusuf.redditclone.repository.MediaRepository;
import com.Yusuf.redditclone.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommunityRepository communityRepository;

    @Autowired
    MediaRepository mediaRepository;



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

    public PostResponseDTO getPostById(int id) {
        Post post = postRepository.findById(id).orElse(null);
        List<MediaDTO> media = mediaRepository.getAllById(id);
        List<PostResponseDTO> postResponseDTOS = new ArrayList<>();
        PostResponseDTO response = new PostResponseDTO();
        response.setName(post.getCommunity().getName());
        response.setTitle(post.getTitle());
        response.setLogo(post.getCommunity().getLogo());
        response.setUserName("u/"+post.getAuthor().getUserName());
        response.setBodyHtml(post.getBodyHtml());
        response.setBodyText(post.getBodyText());
        response.setMedia(media);
        return response;
    }

    public Slice<CommunityPostsResponseDTO> getPostsByCommunity(String community, Pageable pageable) {

        Slice<CommunityPostsResponseDTO> communityPostsResponseDTOList = postRepository.getPostByCommunity(community, pageable);

        for (CommunityPostsResponseDTO communityPostsResponseDTO : communityPostsResponseDTOList) {
            List<MediaDTO> mediaDTOS = mediaRepository.getAllById(communityPostsResponseDTO.getId());
            communityPostsResponseDTO.setMediaResponseDTOList(mediaDTOS);
        }
        return communityPostsResponseDTOList;
    }

    public Slice<HomeFeedResponseDTO> getHomeFeed(Pageable pageable) {
        Slice<HomeFeedResponseDTO> homeFeedResponseDTOS = postRepository.getHomeFeed(pageable);
        for(HomeFeedResponseDTO homeFeedResponseDTO : homeFeedResponseDTOS){
            List<MediaDTO> mediaDTOS = mediaRepository.getAllById(homeFeedResponseDTO.getId());

            homeFeedResponseDTO.setMediaDTOList(mediaDTOS);
        }
        return  homeFeedResponseDTOS;
    }
//
//    public List<PostResponseDTO> getPostByCommunityName(String name) {
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        Integer userId = null;
//
//        if (authentication != null
//                && authentication.isAuthenticated()
//                && authentication.getPrincipal() instanceof UserPrincipal userPrincipal) {
//
//            userId = userPrincipal.getId();
//        }
//        System.out.println(name);
//        return postRepository.findByCommunityName(name, userId);
//
//    }


}

