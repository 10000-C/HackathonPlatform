# DemosManagement 合约文档

## 合约概述

DemosManagement 合约负责管理黑客松活动中参与者提交的项目演示。它与 ActivitiesManagement 合约交互以验证参与者身份，与 JudgementManagement 合约交互以支持评分流程。

## 合约地址

`contracts/DemosManagement.sol`

## 数据结构

### Demo 结构体
```solidity
struct Demo {
    uint256 demoId;      // 演示ID
    uint256 activityId;  // 活动ID
    uint256 cohortId;    // 组别ID
    string dataCID;      // 演示数据的IPFS CID
    string vedioCID;     // 演示视频的IPFS CID
    address submitter;   // 提交者地址
}
```

### 状态变量

- `demos` - 演示映射，activityId => Demo数组
- `judgementManagement` - JudgementManagement 合约实例
- `activitiesManagement` - ActivitiesManagement 合约实例
- `authorityManagement` - AuthorityManagement 合约实例

## 核心功能

### 演示管理

#### 提交演示
```solidity
function submitDemo(
    uint256 _activityId, 
    uint256 _cohortId,
    string memory _dataCID, 
    string memory _vedioCID
) public
```
提交项目演示到指定活动。

参数:
- `_activityId`: 活动ID
- `_cohortId`: 组别ID
- `_dataCID`: 演示数据的IPFS CID
- `_vedioCID`: 演示视频的IPFS CID

要求:
- 调用者必须是活动的参与者

#### 更新演示
```solidity
function updateDemo(
    uint256 _activityId, 
    uint256 _demoId, 
    string memory _dataCID, 
    string memory _vedioCID
) public
```
更新已提交的演示。

参数:
- `_activityId`: 活动ID
- `_demoId`: 演示ID
- `_dataCID`: 新的演示数据CID
- `_vedioCID`: 新的演示视频CID

要求:
- 调用者必须是演示的提交者

#### 获取演示组别ID
```solidity
function getDemoCohortId(uint256 _activityId, uint256 _demoId) public view returns(uint256)
```
获取指定演示的组别ID，用于评分时确定评分标准。

### 合约管理

#### 更新依赖合约地址
```solidity
function updateDependencies(
    address _activitiesManagementAddress, 
    address _judgementManagementAddress
) public onlyOwner()
```
更新依赖合约地址，仅所有者可调用。

参数:
- `_activitiesManagementAddress`: 新的ActivitiesManagement合约地址
- `_judgementManagementAddress`: 新的JudgementManagement合约地址

## 权限修饰符

### onlyOwner
确保调用者是所有者。

## 事件

### DemoSubmitted
演示提交事件
```solidity
event DemoSubmitted(uint256 indexed activityId, Demo demo)
```

### DemoUpdated
演示更新事件
```solidity
event DemoUpdated(uint256 indexed activityId, Demo demo)
```