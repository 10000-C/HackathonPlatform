// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./AuthorityManagement.sol";

contract ActivitiesManagement { 
    event ActivityCreated(uint256 indexed activityId, Activity activity);
    event AcitivityUpdated(uint256 indexed activityId, Activity activity);
    event ActivityStateUpdated(uint256 indexed activityId, string newState);
    event ParticipantAdded(uint256 indexed activityId, address participant);
    event ParticipantRemoved(uint256 indexed activityId, address participant);
    event ActivityDeleted(uint256 indexed activityId, address user);
    
    struct Activity {
        string dataCID; //IPFS CID for JSON metadata
        string location;
        string state;// upcoming, ongoing, completed
        string topic;
        address creator;
        uint256 maxParticipants;
        uint256 cuParticipants;
        uint256 activityId;
    }
    mapping(uint256 => mapping(address => bool)) public isParticipant;
    AuthorityManagement private authorityManagement;
    
    mapping(uint256 => Activity) public activities;
    uint256 public activityCount; 
    
    constructor(address _authorityManagementAddress) {
        authorityManagement = AuthorityManagement(_authorityManagementAddress);
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function createActivity(
        string memory _dataCID,
        string memory _location,
        string memory _topic,
        uint256 _maxParticipants,
        uint256 _cuParticipants
    ) public onlyOrganizer {
        activityCount++;
        Activity memory newActivity = Activity({
            dataCID: _dataCID,
            creator: msg.sender,
            maxParticipants: _maxParticipants,
            cuParticipants: _cuParticipants,
            activityId: activityCount,
            state: "upcoming",
            location: _location,
            topic: _topic
        });
        activities[activityCount] = newActivity;
        emit ActivityCreated(activityCount, newActivity);
    }

    function deleteActivity(uint256 _activityId) public onlyOrganizer {
        require(_activityId > 0 && _activityId <= activityCount, "Invalid activity ID");
        require(activities[_activityId].creator != address(0), "Activity does not exist");
        require(activities[_activityId].creator == msg.sender, "Not the creator of the activity");
        delete activities[_activityId];
    } 

    function deleteActivityForAdmin(uint256 _activityId) public onlyAdmin {
        require(_activityId > 0 && _activityId <= activityCount, "Invalid activity ID");
        require(activities[_activityId].creator != address(0), "Activity does not exist");
        delete activities[_activityId];
    }

    function getActivity(uint256 _activityId) public view returns (Activity memory) {
        require(_activityId > 0 && _activityId <= activityCount, "Invalid activity ID");
        require(activities[_activityId].creator != address(0), "Activity does not exist");
        return activities[_activityId];
    }

    function updateActivityState(uint256 _activityId, string memory newState) public onlyOrganizer {
        require(_activityId > 0 && _activityId <= activityCount, "Invalid activity ID");
        require(activities[_activityId].creator == msg.sender, "Not the creator of the activity");
        require(compareStrings(newState,"upcoming") || compareStrings(newState,"ongoing") || compareStrings(newState,"completed"), "Invalid state");
        require(!compareStrings(newState,activities[_activityId].state), "Activity is already in this state");
        activities[_activityId].state = newState;
        emit ActivityStateUpdated(_activityId, newState);
    }

    function participateInActivity(uint256 _activityId) public onlyLegalUser {
        require(_activityId > 0 && _activityId <= activityCount, "Invalid activity ID");
        require(isParticipant[_activityId][msg.sender] == false, "Already participated in this activity");
        require(activities[_activityId].cuParticipants<activities[_activityId].maxParticipants, "Activity is full");
        
        isParticipant[_activityId][msg.sender] = true;
        activities[_activityId].cuParticipants++;
        emit ParticipantAdded(_activityId, msg.sender);
    } 

    function withdrawFromActivity(uint256 _activityId) public onlyLegalUser {
        require(_activityId > 0 && _activityId <= activityCount, "Invalid activity ID");
        require(isParticipant[_activityId][msg.sender] == true, "Not a participant in this activity");
        
        isParticipant[_activityId][msg.sender] = false;
        activities[_activityId].cuParticipants--;
        emit ParticipantRemoved(_activityId, msg.sender);
    }

    function isParticipantInActivity(uint256 _activityId, address _user) public view returns (bool) {
        require(_activityId > 0 && _activityId <= activityCount, "Invalid activity ID");
        return isParticipant[_activityId][_user];
    }

    modifier onlyOrganizer() {
        require(authorityManagement.isAnOrganizer(msg.sender), "Not an organizer");
        _;
    }

    modifier onlyLegalUser() {
        require(!authorityManagement.isBlockedUser(msg.sender), "User is blocked");
        _;
    }

    modifier onlyAdmin() {
        require(authorityManagement.isAdmin(msg.sender), "Not an admin");
        _;
    }
}