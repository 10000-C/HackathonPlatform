# PrizesManagement 合约文档

## 合约概述

PrizesManagement 合约负责管理黑客松活动的奖项配置。它定义了每个活动的奖项结构，包括不同组别的获奖规则和奖励金额。

## 合约地址

`contracts/PrizesManagement.sol`

## 数据结构

### cohort 结构体
```solidity
struct cohort {
    uint256 numOfWinners;        // 获奖者数量
    string[] criteria;           // 评判标准
    uint256[] pointsOfCriteria;  // 各标准的分数
    uint256 bonusAmount;         // 奖金总额
}
```

### Prize 结构体
```solidity
struct Prize {
    cohort[] cohorts;        // 组别数组
    uint256 activityId;      // 活动ID
    uint256 totalBonusAmount; // 总奖金
}
```

### 状态变量

- `prizes` - 奖项映射，activityId => Prize
- `activitiesManagement` - ActivitiesManagement 合约实例
- `authorityManagement` - AuthorityManagement 合约实例

## 核心功能

### 奖项管理

#### 添加奖项信息
```solidity
function addPrizeInfo(
    uint256 _activityId, 
    uint256 _numOfCohorts, 
    uint256[] memory _numOfWinners, 
    string[][] memory _criteria, 
    uint256[][] memory _pointsOfCriteria, 
    uint256[] memory _bonusAmounts
) public onlyOrganizer(_activityId)
```
为指定活动添加奖项信息，仅活动组织者可调用。

参数:
- `_activityId`: 活动ID
- `_numOfCohorts`: 组别数量
- `_numOfWinners`: 各组别的获奖者数量数组
- `_criteria`: 各组别的评判标准二维数组
- `_pointsOfCriteria`: 各组别各项标准的分数二维数组
- `_bonusAmounts`: 各组别的奖金数组

要求:
- 各数组长度必须一致
- 指定活动尚未配置奖项

#### 获取组别信息
```solidity
function getCohort(uint256 _activityId, uint256 _cohortId) public view returns(cohort memory)
```
获取指定活动指定组别的信息。

参数:
- `_activityId`: 活动ID
- `_cohortId`: 组别ID

返回:
- `cohort`: 组别信息

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

### PrizeAdded
奖项添加事件
```solidity
event PrizeAdded(uint256 indexed activityId, Prize prize)
```