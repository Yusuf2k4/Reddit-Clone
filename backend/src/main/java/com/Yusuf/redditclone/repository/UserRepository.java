package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserNameOrEmail(String username, String email);
}
