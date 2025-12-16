package com.Yusuf.redditclone.security;

import com.Yusuf.redditclone.model.User;
import com.Yusuf.redditclone.model.UserPrincipal;
import com.Yusuf.redditclone.repository.UserRepository;
import com.Yusuf.redditclone.service.JwtService;
import com.Yusuf.redditclone.service.MyUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;

    @Autowired
    UserRepository userRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = extractJwt(request);
        if(token != null && SecurityContextHolder.getContext().getAuthentication() == null){
           String userId = jwtService.extractId(token);
           if(userId != null){
               User user = userRepository.findById(Integer.parseInt(userId)).orElse(null);
               if (user != null){
                   UserDetails userDetails = new UserPrincipal(user);
                   if(jwtService.validateToken(token)){
                       UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                       SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                   }
               }
           }
        }
        filterChain.doFilter(request,response);
    }

    private String extractJwt(HttpServletRequest request){
        if(request.getCookies() == null) return null;
        for(Cookie cookie: request.getCookies()){
            if(cookie.getName().equals("jwt")){
                return cookie.getValue();
            }
        }
        return null;
    }
}
