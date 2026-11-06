package com.Yusuf.redditclone.controller;

import com.Yusuf.redditclone.DTO.*;
import com.Yusuf.redditclone.model.Community;
import com.Yusuf.redditclone.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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
    public Slice<CommunitySearchDTO> communitySearchResult(@PathVariable String name, Pageable pageable){
        return communityService.communitySearchResult(name, pageable);
    }

    @GetMapping("/{community}/posts")
    public Slice<UserPostDTO> getPostByCommunity(@PathVariable String community, Pageable pageable){
        return  communityService.getPostsByCommunity( community, pageable);
    }




}
