package com.Yusuf.RedditClone.controller;

import com.Yusuf.RedditClone.DTO.CommunitiesResponseDTO;
import com.Yusuf.RedditClone.DTO.CommunityDTO;
import com.Yusuf.RedditClone.model.Community;
import com.Yusuf.RedditClone.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CommunityController {

    @Autowired
    CommunityService communityService;

    @PostMapping("/create-community")
    public void createCommunity(@RequestBody CommunityDTO communityDTO){
        communityService.createCommunity(communityDTO);
    }

    @GetMapping("r/{name}")
    public Community getCommunity(@PathVariable String name){
        return communityService.getCommunity(name);
    }

    @GetMapping("/communities")
    public List<CommunitiesResponseDTO> getCommunities(){
        return communityService.getCommunities();
    }

    @GetMapping("communities/{communityName}")
    public List<CommunitiesResponseDTO> getCommunitiesByName(@PathVariable("communityName") String communityName){
        return communityService.getCommunitiesByName(communityName);
    }
}
