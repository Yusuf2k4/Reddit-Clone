package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.model.SavedPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedPostRepository extends JpaRepository<SavedPost, Integer> {
}
