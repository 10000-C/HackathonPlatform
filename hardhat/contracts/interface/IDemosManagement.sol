// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IDemosManagement {
    struct Demo {
        uint256 demoId;
        uint256 activityId;
        uint256 cohortId;
        string dataCID;
        address submitter;
    }
    
    function getDemoCohortId(uint256 _activityId, uint256 _demoId) external view returns(uint256);
}