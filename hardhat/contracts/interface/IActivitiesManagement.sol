// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IActivitiesManagement {
    function isParticipantInActivity(uint256 _activityId, address _user) external view returns (bool);
    function getCreatorOfActivity(uint256 _activityId) external view returns (address);
    function isActivityIdValid(uint256 _activityId) external view returns (bool);
    
    struct Activity {
        string dataCID;
        string topic;
        address creator;
        uint256 maxParticipants;
        uint256 cuParticipants;
        uint256 activityId;
    }
    
    function getActivity(uint256 _activityId) external view returns (Activity memory);
}