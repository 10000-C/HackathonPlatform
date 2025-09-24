// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./interface/IAuthorityManagement.sol";

contract AuthorityManagement is IAuthorityManagement {
    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);
    event UserBlocked(address indexed user);
    event UserUnblocked(address indexed user);

    address public owner;
    mapping(address => bool) private authority;// admin
    mapping(address => bool) private isBlocked;
    mapping(address => bool) private isOrganizer;

    constructor() {
        owner = msg.sender;
        authority[msg.sender] = true;
    }
    //manage admin
    function addAdmin(address _admin) public onlyOwner {
        authority[_admin] = true;
        emit AdminAdded(_admin);
    }

    function removeAdmin(address _admin) public onlyOwner {
        authority[_admin] = false;
        emit AdminRemoved(_admin);
    }

    function isAdmin(address _admin) public view returns (bool) {
        return authority[_admin];
    }
    //manage blocked user
    function blockUser(address _user) public onlyAdmin {
        isBlocked[_user] = true;
        emit UserBlocked(_user);
    }

    function unblockUser(address _user) public onlyAdmin {
        isBlocked[_user] = false;
        emit UserUnblocked(_user);
    } 

    function isBlockedUser(address _user) public view returns (bool) {
        return isBlocked[_user];
    }

    //manage organizer
    function addOrganizer(address _organizer) public onlyAdmin {
        isOrganizer[_organizer] = true;
    }
    function removeOrganizer(address _organizer) public onlyAdmin {
        isOrganizer[_organizer] = false;
    }
    function isAnOrganizer(address _organizer) public view returns (bool) {
        return isOrganizer[_organizer];
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier onlyAdmin() {
        require(authority[msg.sender], "Not the admin");
        _;
    }
}