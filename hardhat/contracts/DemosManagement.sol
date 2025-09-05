// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./interface/IJudgementManagement.sol";
import "./interface/IActivitiesManagement.sol";
import "./interface/IDemosManagement.sol";
import "./interface/IAuthorityManagement.sol";

contract DemosManagement is IDemosManagement { 

    event DemoSubmitted(uint256 indexed activityId, Demo demo);
    event DemoUpdated(uint256 indexed activityId, Demo demo);

    IJudgementManagement private judgementManagement;
    IActivitiesManagement private activitiesManagement;
    IAuthorityManagement private authorityManagement;

    mapping(uint256 => Demo[]) public demos;// activityId => demoId => Demo

    constructor(address _activitiesManagementAddress, address _judgementManagementAddress, address _authorityManagementAddress) {
        activitiesManagement = IActivitiesManagement(_activitiesManagementAddress);
        judgementManagement = IJudgementManagement(_judgementManagementAddress);
        authorityManagement = IAuthorityManagement(_authorityManagementAddress);
    }

    function submitDemo(uint256 _activityId, uint256 _cohortId,string memory _dataCID, string memory _vedioCID) public 
    {
        require(activitiesManagement.isParticipantInActivity(_activityId, msg.sender), "Not a participant of this activity");
        uint256 demoId = demos[_activityId].length; 
        Demo memory newDemo = Demo({
            demoId: demoId,
            activityId: _activityId,
            dataCID: _dataCID,
            vedioCID: _vedioCID,
            submitter: msg.sender,
            cohortId: _cohortId
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

    function getDemoCohortId(uint256 _activityId, uint256 _demoId) public view returns(uint256) {
        require(_demoId >= 0 && _demoId <= demos[_activityId].length, "Invalid demo ID");
        require(activitiesManagement.isActivityIdValid(_activityId), "Invalid activity ID");
        return demos[_activityId][_demoId].cohortId;
    }

    // 添加更新依赖合约地址的方法
    function updateDependencies(address _activitiesManagementAddress, address _judgementManagementAddress) public onlyOwner(){
        activitiesManagement = IActivitiesManagement(_activitiesManagementAddress);
        judgementManagement = IJudgementManagement(_judgementManagementAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == authorityManagement.getOwner(), "Not the owner");
        _;
    }
}