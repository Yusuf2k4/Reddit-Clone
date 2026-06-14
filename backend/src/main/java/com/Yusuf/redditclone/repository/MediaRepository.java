package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.DTO.MediaDTO;
import com.Yusuf.redditclone.DTO.MediaResponseDTO;
import com.Yusuf.redditclone.model.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media,Integer> {
    List<Media> findByPostId(int id);


    @Query("select new com.Yusuf.redditclone.DTO.MediaDTO(m.type,m.media) " +
            "From Media m " +
            "where m.post.id = :id ")

    List<MediaDTO> getAllById(int id);
}
