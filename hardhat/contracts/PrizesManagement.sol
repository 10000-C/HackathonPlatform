// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.28;

import "./ActivitiesManagement.sol";

// part of activity information
/* save details of prizes : 
   cohort : number of winners
   criteria : number of points    
*/
contract PrizesManagement { 

    event PrizeAdded(uint256 indexed activityId, Prize prize);
    ActivitiesManagement private activitiesManagement;
    
    struct cohort{
        uint256 numOfWinners;
        string[] criteria;
        uint256[] pointsOfCriteria;
        uint256 bonusAmount;
    }   

    struct Prize{
        cohort[] cohorts;
        uint256 activityId;
        uint256 totalBonusAmount;
    }
    mapping(uint256 => Prize) public prizes; // activityId => Prize
    
    constructor(address _activitiesManagementAddress) {
        activitiesManagement = ActivitiesManagement(_activitiesManagementAddress);
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

    modifier onlyOrganizer(uint256 _activityId) {
        address activityCreator = activitiesManagement.getCreatorOfActivity(_activityId);
        require(msg.sender == activityCreator, "Not the organizer of this activity");
        _;
    }
}