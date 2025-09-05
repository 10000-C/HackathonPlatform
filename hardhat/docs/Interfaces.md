# 接口文档

## 概述

接口定义了各个合约对外暴露的功能，便于合约之间的解耦和交互。所有主要合约都有对应的接口定义。

## IAuthorityManagement 接口

文件路径: `contracts/interface/IAuthorityManagement.sol`

```solidity
interface IAuthorityManagement {
    function isAdmin(address _admin) external view returns (bool);
    function isBlockedUser(address _user) external view returns (bool);
    function isAnOrganizer(address _organizer) external view returns (bool);
    function getOwner() external view returns (address);
}
```

该接口定义了权限管理相关的基本功能，用于检查用户的角色和状态。

## IActivitiesManagement 接口

文件路径: `contracts/interface/IActivitiesManagement.sol`

```solidity
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
```

该接口定义了活动管理相关的基本功能，用于检查活动参与状态、获取活动创建者和活动信息。

## IDemosManagement 接口

文件路径: `contracts/interface/IDemosManagement.sol`

```solidity
interface IDemosManagement {
    struct Demo {
        uint256 demoId;
        uint256 activityId;
        uint256 cohortId;
        string dataCID;
        string vedioCID;
        address submitter;
    }
    
    function getDemoCohortId(uint256 _activityId, uint256 _demoId) external view returns(uint256);
}
```

该接口定义了演示管理相关的基本功能，用于获取演示的组别ID。

## IJudgementManagement 接口

文件路径: `contracts/interface/IJudgementManagement.sol`

```solidity
interface IJudgementManagement {
    function isJudgeInActivity(uint256 _activityId, address _judge) external view returns (bool);
}
```

该接口定义了评委管理相关的基本功能，用于检查用户是否为指定活动的评委。

## IPrizesManagement 接口

文件路径: `contracts/interface/IPrizesManagement.sol`

```solidity
interface IPrizesManagement {
    struct cohort {
        uint256 numOfWinners;
        string[] criteria;
        uint256[] pointsOfCriteria;
        uint256 bonusAmount;
    }
    
    function getCohort(uint256 _activityId, uint256 _cohortId) external view returns (cohort memory);
}
```

该接口定义了奖项管理相关的基本功能，用于获取指定活动指定组别的奖项信息。