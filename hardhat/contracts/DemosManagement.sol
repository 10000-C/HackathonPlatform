// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./interface/IActivitiesManagement.sol";
import "./interface/IDemosManagement.sol";
import "./interface/IAuthorityManagement.sol";

contract DemosManagement is IDemosManagement { 

    event DemoSubmitted(uint256 indexed activityId, Demo demo);

    IActivitiesManagement private activitiesManagement;
    IAuthorityManagement private authorityManagement;

    mapping(uint256 => Demo[]) public demos;// activityId => demoId => Demo

    constructor(address _activitiesManagementAddress, address _authorityManagementAddress) {
        activitiesManagement = IActivitiesManagement(_activitiesManagementAddress);
        authorityManagement = IAuthorityManagement(_authorityManagementAddress);
    }

    function submitDemo(uint256 _activityId, uint256 _cohortId,string memory _dataCID) public onlyValidTime(_activityId)
    {
        require(activitiesManagement.isParticipantInActivity(_activityId, msg.sender), "Not a participant of this activity");
        uint256 demoId = demos[_activityId].length; 
        Demo memory newDemo = Demo({
            demoId: demoId,
            activityId: _activityId,
            dataCID: _dataCID,
            submitter: msg.sender,
            cohortId: _cohortId
        });
        demos[_activityId].push(newDemo);
        emit DemoSubmitted(_activityId, newDemo);
    }
/*    
    function updateDemo(uint256 _activityId, uint256 _demoId, string memory _dataCID, string memory _vedioCID) public onlyValidTime(_activityId)
    {
        require(activitiesManagement.isParticipantInActivity(_activityId, msg.sender), "Not a participant of this activity");
        require(_demoId >= 0 && _demoId <= demos[_activityId].length, "Invalid demo ID");
        Demo storage demoToUpdate = demos[_activityId][_demoId];
        require(demoToUpdate.submitter == msg.sender, "Not the submitter of this demo");
        demoToUpdate.dataCID = _dataCID;
        demoToUpdate.vedioCID = _vedioCID;
        emit DemoUpdated(_activityId, demoToUpdate);
    }
*/
    function getDemoCohortId(uint256 _activityId, uint256 _demoId) public view returns(uint256) {
        require(_demoId >= 0 && _demoId <= demos[_activityId].length, "Invalid demo ID");
        require(activitiesManagement.isActivityIdValid(_activityId), "Invalid activity ID");
        return demos[_activityId][_demoId].cohortId;
    }

    // 添加更新依赖合约地址的方法
    function updateDependencies(address _activitiesManagementAddress) public onlyOwner(){
        activitiesManagement = IActivitiesManagement(_activitiesManagementAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == authorityManagement.getOwner(), "Not the owner");
        _;
    }

    modifier onlyValidTime(uint256 _activityId) {
        require(activitiesManagement.isActivityIdValid(_activityId), "Invalid activity ID");
        require(activitiesManagement.isHackthonOpen(_activityId), "Not in hackthon time");
        _;
    }
}