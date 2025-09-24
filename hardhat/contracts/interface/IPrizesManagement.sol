// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IPrizesManagement {
    struct cohort {
        uint256 numOfWinners;
        string[] criteria;
        uint256[] pointsOfCriteria;
        uint256 bonusAmount;
    }
    
    function getCohort(uint256 _activityId, uint256 _cohortId) external view returns (cohort memory);
}