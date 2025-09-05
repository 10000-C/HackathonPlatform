// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./interface/IActivitiesManagement.sol";
import "./interface/IJudgementManagement.sol";
import "./interface/IAuthorityManagement.sol";

contract JudgementManagement is IJudgementManagement { 

    IActivitiesManagement private activitiesManagement;
    IAuthorityManagement private authorityManagement;

    constructor(address _activitiesManagementAddress, address _authorityManagementAddress) {
        authorityManagement = IAuthorityManagement(_authorityManagementAddress);
        activitiesManagement = IActivitiesManagement(_activitiesManagementAddress);
    }
    
    mapping(uint256 => mapping(bytes32 => bool)) private isInvitationCodeValid; // activityId => invitationCode => exists
    mapping(uint256 => mapping(address => bool)) public isJudge; // activityId => judge => isJudge

    function random(uint256 number) public view returns(uint256) {
        return uint(keccak256(abi.encodePacked(block.timestamp,block.prevrandao,  
        msg.sender))) % number;
    }

    function createJudgeInvitation(uint256 _activityId, string memory _judgeName) public onlyOrganizer(_activityId) 
    returns(bytes32 invitationCode)
    {
        uint256 randomNumber = random(_activityId * 1000);
        invitationCode = keccak256(abi.encodePacked(randomNumber, _judgeName, msg.sender));
        isInvitationCodeValid[_activityId][invitationCode] = true;
        return invitationCode;
    }

    function registerAsJudge(uint256 _activityId, bytes32 _invitationCode) public returns(bool) {
        if(!isInvitationCodeValid[_activityId][_invitationCode]) {
            return false; // invalid code
        }
        isJudge[_activityId][msg.sender] = true;
        return true;
    }

    function isJudgeInActivity(uint256 _activityId, address _judge) public view returns(bool) {
        return isJudge[_activityId][_judge];
    } 

    // 添加更新 ActivitiesManagement 地址的方法
    function updateDependencies(address _newActivitiesManagementAddress) public onlyOwner(){
        activitiesManagement = IActivitiesManagement(_newActivitiesManagementAddress);
    }

    modifier onlyOrganizer(uint256 _activityId)  {
        address activityCreator = activitiesManagement.getCreatorOfActivity(_activityId);
        require(msg.sender == activityCreator, "Not the organizer of this activity");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == authorityManagement.getOwner(), "Not the owner");
        _;
    }
}