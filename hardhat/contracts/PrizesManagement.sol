// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.28;

import "./interface/IActivitiesManagement.sol";
import "./interface/IPrizesManagement.sol";
import "./interface/IAuthorityManagement.sol";

// part of activity information
/* save details of prizes : 
   cohort : number of winners
   criteria : number of points    
*/
contract PrizesManagement is IPrizesManagement { 

    event PrizeAdded(uint256 indexed activityId, Prize prize);
    IActivitiesManagement private activitiesManagement;
    IAuthorityManagement private authorityManagement;
    
    struct Prize{
        cohort[] cohorts;
        uint256 activityId;
        uint256 totalBonusAmount;
    }
    mapping(uint256 => Prize) public prizes; // activityId => Prize
    
    constructor(address _activitiesManagementAddress) {
        activitiesManagement = IActivitiesManagement(_activitiesManagementAddress);
    }
    
    function addPrizeInfo(uint256 _activityId, uint256 _numOfCohorts, uint256[] memory _numOfWinners, string[][] memory _criteria, uint256[][] memory _pointsOfCriteria, uint256[] memory _bonusAmounts) public onlyOrganizer(_activityId){
        require(prizes[_activityId].activityId == 0, "Prize info already added for this activity");
        require(_numOfCohorts == _criteria.length &&_criteria.length == _numOfWinners.length && _criteria.length == _bonusAmounts.length && _criteria.length == _pointsOfCriteria.length, "Mismatched cohorts data");
        cohort[] storage cohorts = prizes[_activityId].cohorts;
        for (uint256 i = 0; i < _numOfCohorts; i++) { 
            cohorts.push(cohort(_numOfWinners[i], _criteria[i], _pointsOfCriteria[i], _bonusAmounts[i]));
            prizes[_activityId].totalBonusAmount += _bonusAmounts[i];
        }
        prizes[_activityId].activityId = _activityId;
        emit PrizeAdded(_activityId, prizes[_activityId]);
    }

    function getCohort(uint256 _activityId, uint256 _cohortId) public view returns(cohort memory) {
        require(prizes[_activityId].activityId != 0, "No prize info for this activity");
        require(_cohortId < prizes[_activityId].cohorts.length, "Invalid cohort index");
        return prizes[_activityId].cohorts[_cohortId];
    }

    // 添加更新 ActivitiesManagement 地址的方法
    function updateDependencies(address _newActivitiesManagementAddress) public onlyOwner(){
        // 这里需要获取活动创建者来验证权限，暂时使用modifier中的逻辑
        activitiesManagement = IActivitiesManagement(_newActivitiesManagementAddress);
    }

    modifier onlyOrganizer(uint256 _activityId) {
        address activityCreator = activitiesManagement.getCreatorOfActivity(_activityId);
        require(msg.sender == activityCreator, "Not the organizer of this activity");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == authorityManagement.getOwner(), "Not the owner");
        _;
    }
}