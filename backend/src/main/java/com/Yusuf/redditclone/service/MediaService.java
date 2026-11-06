package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.DTO.MediaDTO;
import com.Yusuf.redditclone.DTO.UserPostDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class MediaService {


    public void mapMediaWithPost(Map<Integer, UserPostDTO> map, List<MediaDTO> mediaDTOList) {
        for(MediaDTO media: mediaDTOList){
            int postId = media.getPostId();
            if(map.containsKey(postId)){
                UserPostDTO post = map.get(postId);
                List<MediaDTO> mediaList = post.getMediaList();
                if(mediaList == null){
                    mediaList = new ArrayList<>();
                    post.setMediaList(mediaList);
                }
                mediaList.add(media);

            }

        }
    }
}
