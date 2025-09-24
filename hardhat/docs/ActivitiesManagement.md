# ActivitiesManagement 合约文档

## 合约概述

ActivitiesManagement 合约负责管理黑客松活动的创建、更新、删除和参与管理。它与 AuthorityManagement 合约交互以验证用户权限。

## 合约地址

`contracts/ActivitiesManagement.sol`

## 数据结构

### Activity 结构体
```solidity
struct Activity {
    string dataCID;          // 活动数据的IPFS CID
    string topic;            // 活动主题
    address creator;         // 活动创建者地址
    uint256 maxParticipants; // 最大参与人数
    uint256 cuParticipants;  // 当前参与人数
    uint256 activityId;      // 活动ID
}
```

### 状态变量

- `activities` - 活动映射，activityId => Activity
- `activityCount` - 活动计数器
- `isParticipant` - 参与者映射，activityId => user => bool
- `authorityManagement` - AuthorityManagement 合约实例

## 核心功能

### 活动管理

#### 创建活动
```solidity
function createActivity(
    string memory _dataCID,
    string memory _topic,
    uint256 _maxParticipants,
    uint256 _cuParticipants
) public onlyOrganizer
```
创建一个新的黑客松活动，仅组织者可调用。

参数:
- `_dataCID`: 活动数据的IPFS CID
- `_topic`: 活动主题
- `_maxParticipants`: 最大参与人数
- `_cuParticipants`: 当前参与人数（通常为0）

#### 更新活动
```solidity
function updateActivity(
    uint256 _activityId,
    string memory _dataCID,
    string memory _topic,
    uint256 _maxParticipants
) public onlyOrganizer
```
更新指定活动的信息，仅活动创建者可调用。

参数:
- `_activityId`: 活动ID
- `_dataCID`: 新的活动数据CID
- `_topic`: 新的活动主题
- `_maxParticipants`: 新的最大参与人数

#### 删除活动
```solidity
function deleteActivity(uint256 _activityId) public onlyOrganizer
```
删除指定活动，仅活动创建者可调用。

#### 管理员删除活动
```solidity
function deleteActivityForAdmin(uint256 _activityId) public onlyAdmin
```
管理员删除指定活动。

#### 获取活动信息
```solidity
function getActivity(uint256 _activityId) public view returns (Activity memory)
```
获取指定活动的详细信息。

### 参与管理

#### 参与活动
```solidity
function participateInActivity(uint256 _activityId) public onlyLegalUser
```
参与指定活动，仅未被封禁用户可调用。

#### 退出活动
```solidity
function withdrawFromActivity(uint256 _activityId) public onlyLegalUser
```
退出指定活动。

#### 检查参与状态
```solidity
function isParticipantInActivity(uint256 _activityId, address _user) public view returns (bool)
```
检查指定用户是否参与了指定活动。

### 辅助功能

#### 获取活动创建者
```solidity
function getCreatorOfActivity(uint256 _activityId) public view returns (address)
```
获取指定活动的创建者地址，用于JudgementManagement验证评委权限。

#### 验证活动ID有效性
```solidity
function isActivityIdValid(uint256 _activityId) public view returns (bool)
```
验证指定活动ID是否有效。

### 合约管理

#### 更新依赖合约地址
```solidity
function updateDependencies(address _newAuthorityManagementAddress) public onlyOwner
```
更新AuthorityManagement合约地址，仅所有者可调用。

## 权限修饰符

### onlyOrganizer
确保调用者是组织者。

### onlyLegalUser
确保调用者未被封禁。

### onlyAdmin
确保调用者是管理员。

### onlyOwner
确保调用者是所有者。

## 事件

### ActivityCreated
活动创建事件
```solidity
event ActivityCreated(uint256 indexed activityId, Activity activity)
```

### ActivityUpdated
活动更新事件
```solidity
event ActivityUpdated(uint256 indexed activityId, Activity activity)
```

### ParticipantAdded
参与者添加事件
```solidity
event ParticipantAdded(uint256 indexed activityId, address participant)
```

### ParticipantRemoved
参与者移除事件
```solidity
event ParticipantRemoved(uint256 indexed activityId, address participant)
```

### ActivityDeleted
活动删除事件
```solidity
event ActivityDeleted(uint256 indexed activityId, address user)
```