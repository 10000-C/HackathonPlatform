// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./JudgementManagement.sol";
import "./ActivitiesManagement.sol";

contract DemosManagement { 

    event DemoSubmitted(uint256 indexed activityId, Demo demo);
    event DemoUpdated(uint256 indexed activityId, Demo demo);

    JudgementManagement private judgementManagement;
    ActivitiesManagement private activitiesManagement;

    struct Demo {
        uint256 demoId;// 从0开始
        uint256 activityId;
        string dataCID;
        string vedioCID;
        address submitter;
    }

    mapping(uint256 => Demo[]) public demos;// activityId => demoId => Demo

    constructor(address _activitiesManagementAddress, address _judgementManagementAddress) {
        activitiesManagement = ActivitiesManagement(_activitiesManagementAddress);
        judgementManagement = JudgementManagement(_judgementManagementAddress);
    }

    function submitDemo(uint256 _activityId, string memory _dataCID, string memory _vedioCID) public 
    {
        require(activitiesManagement.isParticipantInActivity(_activityId, msg.sender), "Not a participant of this activity");
        uint256 demoId = demos[_activityId].length; 
        Demo memory newDemo = Demo({
            demoId: demoId,
            activityId: _activityId,
            dataCID: _dataCID,
            vedioCID: _vedioCID,
            submitter: msg.sender
        });
        demos[_activityId].push(newDemo);
        emit DemoSubmitted(_activityId, newDemo);
    }
    
    function updateDemo(uint256 _activityId, uint256 _demoId, string memory _dataCID, string memory _vedioCID) public 
    {
        require(activitiesManagement.isParticipantInActivity(_activityId, msg.sender), "Not a participant of this activity");
        require(_demoId >= 0 && _demoId <= demos[_activityId].length, "Invalid demo ID");
        Demo storage demoToUpdate = demos[_activityId][_demoId];
        require(demoToUpdate.submitter == msg.sender, "Not the submitter of this demo");
        demoToUpdate.dataCID = _dataCID;
        demoToUpdate.vedioCID = _vedioCID;
        emit DemoUpdated(_activityId, demoToUpdate);
    }

}