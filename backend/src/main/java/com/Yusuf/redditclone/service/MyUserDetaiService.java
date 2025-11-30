package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.model.User;
import com.Yusuf.redditclone.model.UserPrincipal;
import com.Yusuf.redditclone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class MyUserDetaiService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(username);
        if(user == null){
            throw new UsernameNotFoundException("User does not exist");
        }
        return new UserPrincipal(user);
    }
}
