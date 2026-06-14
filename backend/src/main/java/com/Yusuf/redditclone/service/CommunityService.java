package com.Yusuf.redditclone.service;

import com.Yusuf.redditclone.DTO.CommunitiesResponseDTO;
import com.Yusuf.redditclone.DTO.CommunityDTO;
import com.Yusuf.redditclone.DTO.CommunityPageResponse;
import com.Yusuf.redditclone.model.Community;
import com.Yusuf.redditclone.model.Tag;
import com.Yusuf.redditclone.repository.CommunityRepository;
import com.Yusuf.redditclone.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommunityService {

    @Autowired
    CommunityRepository communityRepository;
    @Autowired
    TagRepository tagRepository;

    public void createCommunity(CommunityDTO communityDTO) {
        List<Tag> tagArrayList = new ArrayList<>();

        Community newCommunity = new Community();
        newCommunity.setName(communityDTO.getName());
        newCommunity.setDescription(communityDTO.getDescription());
        newCommunity.setBanner(communityDTO.getBanner());
        newCommunity.setLogo(communityDTO.getLogo());


        for(String tags: communityDTO.getTagList()){
            Tag getTag = tagRepository.findByName(tags);
            tagArrayList.add(getTag);

        }
        newCommunity.setTagList(tagArrayList);
        communityRepository.save(newCommunity);
    }

    public CommunityPageResponse getCommunity(String name) {

        Community community = communityRepository.getByName(name);
        CommunityPageResponse communityPageResponse = new CommunityPageResponse();
        communityPageResponse.setId(community.getId());
        communityPageResponse.setName(community.getName());
        communityPageResponse.setLogo(community.getLogo());
        communityPageResponse.setBanner(community.getBanner());
        communityPageResponse.setDescription(community.getDescription());
        communityPageResponse.setCreatedAt(community.getCreatedAt());
        return communityPageResponse;

    }

    public List<CommunitiesResponseDTO> getCommunities() {
        List<CommunitiesResponseDTO> communitiesResponseDTOList = new ArrayList<>();
        List<Community> communityList = communityRepository.findAll();
        for(Community community: communityList){
            CommunitiesResponseDTO communitiesResponseDTO = new CommunitiesResponseDTO();
            communitiesResponseDTO.setId(community.getId());
            communitiesResponseDTO.setName(community.getName());
            communitiesResponseDTO.setLogo(community.getLogo());
            communitiesResponseDTOList.add(communitiesResponseDTO);
        }
        return communitiesResponseDTOList;
    }

    public List<CommunitiesResponseDTO> getCommunitiesByName(String communityName) {
        List<CommunitiesResponseDTO> communitiesResponseDTOList = new ArrayList<>();
        List<Community> communityList = communityRepository.findByNameContainingIgnoreCase(communityName);
        if(communityList != null){
            for(Community community: communityList){
                CommunitiesResponseDTO communitiesResponseDTO = new CommunitiesResponseDTO();
                communitiesResponseDTO.setId(community.getId());
                communitiesResponseDTO.setName(community.getName());
                communitiesResponseDTO.setLogo(community.getLogo());
                communitiesResponseDTOList.add(communitiesResponseDTO);
            }
        }
        else{
            return new ArrayList<>();
        }
        return communitiesResponseDTOList;
    }
}
