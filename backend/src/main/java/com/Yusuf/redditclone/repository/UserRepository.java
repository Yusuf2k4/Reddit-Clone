package com.Yusuf.redditclone.repository;

import com.Yusuf.redditclone.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserNameOrEmail(String username, String email);


    Optional<User> findByEmail(String email);
}
