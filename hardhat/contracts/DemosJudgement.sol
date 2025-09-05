//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./interface/IPrizesManagement.sol";
import "./interface/IJudgementManagement.sol";
import "./interface/IDemosManagement.sol";
import "./interface/IActivitiesManagement.sol";
import "./interface/IAuthorityManagement.sol";

contract DemosJudgement{ 
    event DemoJudged(uint256 indexed activityId, uint256 indexed demoId, uint256 totalScore, uint256 numOfJudges);

    IPrizesManagement private prizesManagement;
    IJudgementManagement private judgementManagement;
    IDemosManagement private demosManagement;
    IActivitiesManagement private activitiesManagement;
    IAuthorityManagement private authorityManagement;

    struct Score{
        uint256 totalScore;
        uint256 numOfJudges;
    }

    mapping(uint256 => mapping(uint256 => Score)) public demoScores; // activityId => demoId => totalScore
    mapping(address => mapping(uint256 => mapping( uint256 => bool))) public hasJudged; // judge => activityId => demoId => hasJudged

    constructor(address _prizesManagementAddress, address _judgementManagementAddress, address _demosManagementAddress, address _activitiesManagementAddress, address _authorityManagementAddress) {
        prizesManagement = IPrizesManagement(_prizesManagementAddress);
        judgementManagement = IJudgementManagement(_judgementManagementAddress);
        demosManagement = IDemosManagement(_demosManagementAddress);
        activitiesManagement = IActivitiesManagement(_activitiesManagementAddress);
        authorityManagement = IAuthorityManagement(_authorityManagementAddress);
    }

    function checkPointsValid(uint256[] memory _pointsOfCriteria, uint256[] memory _pointsOfJudge) internal pure returns(bool) {
        if(_pointsOfCriteria.length != _pointsOfJudge.length) {
            return false;
        }
        for(uint256 i = 0; i < _pointsOfCriteria.length; i++) {
            if(_pointsOfJudge[i] > _pointsOfCriteria[i]) {
                return false;
            }
        }
        return true;
    }

    function JudgeDemo(uint256 _activityId, uint256 _demoId, uint256[] memory _pointsOfCriteria) public onlyJudge(_activityId) {
        require(!hasJudged[msg.sender][_activityId][_demoId], "Already judged this demo");
        uint256 cohortId = demosManagement.getDemoCohortId(_activityId, _demoId);
        IPrizesManagement.cohort memory prizeCohort = prizesManagement.getCohort(_activityId, cohortId); 
        require(checkPointsValid(prizeCohort.pointsOfCriteria, _pointsOfCriteria), "Invalid points of criteria");
       
        uint256 totscore = 0;
        for(uint256 i=0; i < _pointsOfCriteria.length; i++){
            totscore += _pointsOfCriteria[i];
        }
        demoScores[_activityId][_demoId].totalScore += totscore;
        demoScores[_activityId][_demoId].numOfJudges += 1;
        hasJudged[msg.sender][_activityId][_demoId] = true;
        emit DemoJudged(_activityId, _demoId, totscore, demoScores[_activityId][_demoId].numOfJudges);
    }

    modifier onlyJudge(uint256 _activityId) {
        require(judgementManagement.isJudgeInActivity(_activityId, msg.sender), "Not the judge of this activity");
        _;
    }

    modifier onlyJudgeInValidTime(uint256 _activityId) {
        // You can add time validation logic here if needed
        _;
    }

    // 添加更新依赖合约地址的方法
    function updateDependencies(
        address _prizesManagementAddress,
        address _judgementManagementAddress,
        address _demosManagementAddress,
        address _activitiesManagementAddress
    ) public onlyOwner(){
        prizesManagement = IPrizesManagement(_prizesManagementAddress);
        judgementManagement = IJudgementManagement(_judgementManagementAddress);
        demosManagement = IDemosManagement(_demosManagementAddress);
        activitiesManagement = IActivitiesManagement(_activitiesManagementAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == authorityManagement.getOwner(), "Not the owner");
        _;
    }
}