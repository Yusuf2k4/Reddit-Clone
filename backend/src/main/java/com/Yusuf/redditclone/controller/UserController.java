package com.Yusuf.redditclone.controller;


import com.Yusuf.redditclone.DTO.UserLoginRequestDTO;
import com.Yusuf.redditclone.DTO.UserRequestDTO;
import com.Yusuf.redditclone.service.JwtService;
import com.Yusuf.redditclone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;


    @PostMapping("/register-user")
    public String registerUser(UserRequestDTO userRequestDTO){
        return userService.registerUser(userRequestDTO);
    }
    @PostMapping("/login")
    public String login(@RequestBody UserLoginRequestDTO userLoginRequestDTO){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginRequestDTO.getUsername(), userLoginRequestDTO.getPassword()));
        if(authentication.isAuthenticated()){
            return jwtService.generateToken(userLoginRequestDTO.getUsername());
        }
        else{
            return "Wrong username or password";
        }
    }
}
