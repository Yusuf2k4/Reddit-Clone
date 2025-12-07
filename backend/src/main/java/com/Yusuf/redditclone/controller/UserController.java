package com.Yusuf.redditclone.controller;


import com.Yusuf.redditclone.DTO.UserLoginRequestDTO;
import com.Yusuf.redditclone.DTO.UserRequestDTO;
import com.Yusuf.redditclone.model.UserPrincipal;
import com.Yusuf.redditclone.service.JwtService;
import com.Yusuf.redditclone.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;


    @PostMapping("/register-user")
    public String registerUser(@RequestBody UserRequestDTO userRequestDTO){
        return userService.registerUser(userRequestDTO);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserLoginRequestDTO userLoginRequestDTO, HttpServletResponse response){
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginRequestDTO.getUsername(), userLoginRequestDTO.getPassword()));
            if(authentication.isAuthenticated()){
                UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
                String token = jwtService.generateToken(String.valueOf(userPrincipal.getId()));
                ResponseCookie cookie = ResponseCookie.from("jwt", token)
                        .httpOnly(true)
                        .secure(false)
                        .path("/")

                        .maxAge(10L * 24 * 60 * 60)
                        .sameSite("strict")
                        .build();
                response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
                return  "login Successful";
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "Wrong username or password";


    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal UserDetails user){
        if(user == null){
            return new ResponseEntity<>("Error occured", HttpStatus.BAD_REQUEST);
        }
        return userService.getUser(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        System.out.println("IN LOGOUT");
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("strict")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());



        return ResponseEntity.ok("User logged out"); // <-- MUST be 200 OK
    }

}
