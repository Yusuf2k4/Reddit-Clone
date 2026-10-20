package com.Yusuf.redditclone.controller;

import com.Yusuf.redditclone.DTO.CommunitiesResponseDTO;
import com.Yusuf.redditclone.DTO.CommunityDTO;
import com.Yusuf.redditclone.DTO.CommunityPageResponse;
import com.Yusuf.redditclone.DTO.CommunitySearchDTO;
import com.Yusuf.redditclone.model.Community;
import com.Yusuf.redditclone.service.CommunityService;
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
    public CommunityPageResponse getCommunity(@PathVariable String name){

        return communityService.getCommunity(name);
    }

    @GetMapping("/communities")
    public List<CommunitiesResponseDTO> getCommunities(){
        return communityService.getCommunities();
    }

    @GetMapping("/communities/{communityName}")
    public List<CommunitiesResponseDTO> getCommunitiesByName(@PathVariable("communityName") String communityName){
        return communityService.getCommunitiesByName(communityName);
    }

    @GetMapping("/autocomplete/communities/{communityName}")
    public List<CommunitiesResponseDTO> autocompleteCommunities(@PathVariable("communityName") String communityName){
        return communityService.autocompleteCommunities(communityName);
    }

    @GetMapping("/fallbackCommunities")
    public List<CommunitiesResponseDTO> fallbackCommunities(){
        return communityService.fallbackCommunities();
    }

    @GetMapping("/search/community/{name}")
    public List<CommunitySearchDTO> communitySearchResult(@PathVariable String name){
        return communityService.communitySearchResult(name);
    }


}
