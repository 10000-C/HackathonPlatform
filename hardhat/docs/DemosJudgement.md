# DemosJudgement 合约文档

## 合约概述

DemosJudgement 合约负责管理演示项目的评分流程。评委可以对项目进行评分，系统会记录和计算平均分，并触发相关事件。

## 合约地址

`contracts/DemosJudgement.sol`

## 数据结构

### Score 结构体
```solidity
struct Score {
    uint256 totalScore;   // 总分
    uint256 numOfJudges;  // 评委数量
}
```

### 状态变量

- `demoScores` - 演示得分映射，activityId => demoId => Score
- `hasJudged` - 评委评分记录映射，judge => activityId => demoId => bool
- `prizesManagement` - PrizesManagement 合约实例
- `judgementManagement` - JudgementManagement 合约实例
- `demosManagement` - DemosManagement 合约实例
- `activitiesManagement` - ActivitiesManagement 合约实例
- `authorityManagement` - AuthorityManagement 合约实例

## 核心功能

### 评分管理

#### 评委评分
```solidity
function JudgeDemo(
    uint256 _activityId, 
    uint256 _demoId, 
    uint256[] memory _pointsOfCriteria
) public onlyJudge(_activityId)
```
评委对指定演示进行评分，仅评委可调用。

参数:
- `_activityId`: 活动ID
- `_demoId`: 演示ID
- `_pointsOfCriteria`: 各项标准的得分数组

要求:
- 评委尚未对此演示评分
- 得分不超过预设标准分数

#### 验证评分有效性
```solidity
function checkPointsValid(
    uint256[] memory _pointsOfCriteria, 
    uint256[] memory _pointsOfJudge
) internal pure returns(bool)
```
检查评委给出的分数是否有效（不超过标准分数）。

参数:
- `_pointsOfCriteria`: 标准分数数组
- `_pointsOfJudge`: 评委分数数组

返回:
- `bool`: 分数是否有效

## 权限修饰符

### onlyJudge
确保调用者是指定活动的评委。

### onlyJudgeInValidTime
确保在有效时间内评分（当前为空实现）。

### onlyOwner
确保调用者是所有者。

## 合约管理

### 更新依赖合约地址
```solidity
function updateDependencies(
    address _prizesManagementAddress,
    address _judgementManagementAddress,
    address _demosManagementAddress,
    address _activitiesManagementAddress
) public onlyOwner()
```
更新依赖合约地址，仅所有者可调用。

参数:
- `_prizesManagementAddress`: 新的PrizesManagement合约地址
- `_judgementManagementAddress`: 新的JudgementManagement合约地址
- `_demosManagementAddress`: 新的DemosManagement合约地址
- `_activitiesManagementAddress`: 新的ActivitiesManagement合约地址

## 事件

### DemoJudged
演示评分事件
```solidity
event DemoJudged(
    uint256 indexed activityId, 
    uint256 indexed demoId, 
    uint256 totalScore, 
    uint256 numOfJudges
)
```