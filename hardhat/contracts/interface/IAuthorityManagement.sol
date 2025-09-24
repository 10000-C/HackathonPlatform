// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IAuthorityManagement {
    function isAdmin(address _admin) external view returns (bool);
    function isBlockedUser(address _user) external view returns (bool);
    function isAnOrganizer(address _organizer) external view returns (bool);
    function getOwner() external view returns (address);
}