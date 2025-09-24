// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IJudgementManagement {
    function isJudgeInActivity(uint256 _activityId, address _judge) external view returns (bool);
    function getJudgeInvitationCode(uint256 _activityId, string memory _judgeName) external view returns (bytes32);
}