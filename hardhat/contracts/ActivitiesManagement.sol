// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./AuthorityManagement.sol";

contract ActivitiesManagement { 
    event ActivityCreated(uint256 indexed activityId, string dataCID);
    struct Activity {
        string dataCID; //IPFS CID for JSON metadata
        address creator;
        uint256 maxParticipants;
        uint256 cuParticipants;
        uint256 acticityId;
    }
    mapping(uint256 => mapping(address => bool)) public isParticipant;
    AuthorityManagement private authorityManagement;
    
    mapping(uint256 => Activity) public activities;
    uint256 public activityCount; 
    
    constructor(address _authorityManagementAddress) {
        authorityManagement = AuthorityManagement(_authorityManagementAddress);
    }

    function createActivity(
        string memory _dataCID,
        uint256 _maxParticipants,
        uint256 _cuParticipants
    ) public onlyOrganizer {
        activityCount++;
        Activity memory newActivity = Activity({
            dataCID: _dataCID,
            creator: msg.sender,
            maxParticipants: _maxParticipants,
            cuParticipants: _cuParticipants,
            acticityId: activityCount
        });
        activities[activityCount] = newActivity;
        emit ActivityCreated(activityCount, _dataCID);
    }

    function deleteActivity(uint256 _activityId) public onlyOrganizer {
        require(_activityId > 0 && _activityId <= activityCount, "Invalid activity ID");
        require(activities[_activityId].creator == msg.sender, "Not the creator of the activity");
        delete activities[_activityId];
    } 

    function getActivity(uint256 _activityId) public view returns (Activity memory) {
        require(_activityId > 0 && _activityId <= activityCount, "Invalid activity ID");
        require(activities[_activityId].creator != address(0), "Activity does not exist");
        return activities[_activityId];
    }

    function participateInActivity(uint256 _activityId) public onlyLegalUser {
        require(_activityId > 0 && _activityId <= activityCount, "Invalid activity ID");
        require(isParticipant[_activityId][msg.sender] == false, "Already participated in this activity");
        require(activities[_activityId].cuParticipants<activities[_activityId].maxParticipants, "Activity is full");
        
        isParticipant[_activityId][msg.sender] = true;
        activities[_activityId].cuParticipants++;
    } 

    function withdrawFromActivity(uint256 _activityId) public onlyLegalUser {
        require(_activityId > 0 && _activityId <= activityCount, "Invalid activity ID");
        require(isParticipant[_activityId][msg.sender] == true, "Not a participant in this activity");
        
        isParticipant[_activityId][msg.sender] = false;
        activities[_activityId].cuParticipants--;
    }

    modifier onlyOrganizer() {
        require(authorityManagement.isAnOrganizer(msg.sender), "Not an organizer");
        _;
    }

    modifier onlyLegalUser() {
        require(!authorityManagement.isBlockedUser(msg.sender), "User is blocked");
        _;
    }
}