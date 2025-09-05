// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IJudgementManagement {
    function isJudgeInActivity(uint256 _activityId, address _judge) external view returns (bool);
}