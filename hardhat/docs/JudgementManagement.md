# JudgementManagement 合约文档

## 合约概述

JudgementManagement 合约负责管理黑客松活动的评委系统。它处理评委邀请码的生成和评委注册流程，确保只有合法评委可以参与项目评分。

## 合约地址

`contracts/JudgementManagement.sol`

## 数据结构

### 状态变量

- `isInvitationCodeValid` - 邀请码有效性映射，activityId => invitationCode => bool
- `isJudge` - 评委映射，activityId => judge => bool
- `activitiesManagement` - ActivitiesManagement 合约实例
- `authorityManagement` - AuthorityManagement 合约实例

## 核心功能

### 评委管理

#### 创建评委邀请码
```solidity
function createJudgeInvitation(
    uint256 _activityId, 
    string memory _judgeName
) public onlyOrganizer(_activityId) returns(bytes32 invitationCode)
```
为指定活动创建评委邀请码，仅活动组织者可调用。

参数:
- `_activityId`: 活动ID
- `_judgeName`: 评委名称

返回:
- `invitationCode`: 生成的邀请码

#### 注册为评委
```solidity
function registerAsJudge(uint256 _activityId, bytes32 _invitationCode) public returns(bool)
```
使用邀请码注册为指定活动的评委。

参数:
- `_activityId`: 活动ID
- `_invitationCode`: 邀请码

返回:
- `bool`: 注册是否成功

#### 检查评委资格
```solidity
function isJudgeInActivity(uint256 _activityId, address _judge) public view returns(bool)
```
检查指定地址是否为指定活动的评委。

参数:
- `_activityId`: 活动ID
- `_judge`: 评委地址

返回:
- `bool`: 是否为评委

#### 生成随机数
```solidity
function random(uint256 number) public view returns(uint256)
```
生成随机数，用于创建邀请码。

参数:
- `number`: 随机数上限

返回:
- `uint256`: 生成的随机数

### 合约管理

#### 更新依赖合约地址
```solidity
function updateDependencies(address _newActivitiesManagementAddress) public onlyOwner()
```
更新ActivitiesManagement合约地址，仅所有者可调用。

参数:
- `_newActivitiesManagementAddress`: 新的ActivitiesManagement合约地址

## 权限修饰符

### onlyOrganizer
确保调用者是指定活动的组织者。

### onlyOwner
确保调用者是所有者。

## 事件

该合约目前没有定义事件。