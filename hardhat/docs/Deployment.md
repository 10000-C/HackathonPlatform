# 部署指南

## 概述

本文档介绍如何部署 Hackthon Platform 智能合约系统。由于合约之间存在依赖关系，需要按照特定顺序进行部署。

## 部署顺序

由于合约之间的依赖关系，必须按照以下顺序部署：

1. AuthorityManagement
2. ActivitiesManagement
3. DemosManagement
4. JudgementManagement
5. PrizesManagement
6. DemosJudgement

## 依赖关系说明

- AuthorityManagement: 独立合约，无依赖
- ActivitiesManagement: 依赖 AuthorityManagement
- DemosManagement: 依赖 ActivitiesManagement, JudgementManagement, AuthorityManagement
- JudgementManagement: 依赖 ActivitiesManagement, AuthorityManagement
- PrizesManagement: 依赖 ActivitiesManagement, AuthorityManagement
- DemosJudgement: 依赖 PrizesManagement, JudgementManagement, DemosManagement, ActivitiesManagement, AuthorityManagement

## 部署步骤

### 1. 部署 AuthorityManagement

首先部署 AuthorityManagement 合约，它不依赖其他合约：

```javascript
const authorityManagement = await ethers.deployContract("AuthorityManagement");
await authorityManagement.waitForDeployment();
```

### 2. 部署 ActivitiesManagement

使用 AuthorityManagement 合约地址部署 ActivitiesManagement：

```javascript
const activitiesManagement = await ethers.deployContract("ActivitiesManagement", [
  authorityManagement.target  // AuthorityManagement 合约地址
]);
await activitiesManagement.waitForDeployment();
```

### 3. 部署 JudgementManagement

使用 ActivitiesManagement 和 AuthorityManagement 合约地址部署 JudgementManagement：

```javascript
const judgementManagement = await ethers.deployContract("JudgementManagement", [
  activitiesManagement.target,   // ActivitiesManagement 合约地址
  authorityManagement.target     // AuthorityManagement 合约地址
]);
await judgementManagement.waitForDeployment();
```

### 4. 部署 DemosManagement

使用 ActivitiesManagement、JudgementManagement 和 AuthorityManagement 合约地址部署 DemosManagement：

```javascript
const demosManagement = await ethers.deployContract("DemosManagement", [
  activitiesManagement.target,   // ActivitiesManagement 合约地址
  judgementManagement.target,    // JudgementManagement 合约地址
  authorityManagement.target     // AuthorityManagement 合约地址
]);
await demosManagement.waitForDeployment();
```

### 5. 部署 PrizesManagement

使用 ActivitiesManagement 合约地址部署 PrizesManagement：

```javascript
const prizesManagement = await ethers.deployContract("PrizesManagement", [
  activitiesManagement.target    // ActivitiesManagement 合约地址
]);
await prizesManagement.waitForDeployment();
```

### 6. 部署 DemosJudgement

使用所有其他管理合约的地址部署 DemosJudgement：

```javascript
const demosJudgement = await ethers.deployContract("DemosJudgement", [
  prizesManagement.target,       // PrizesManagement 合约地址
  judgementManagement.target,    // JudgementManagement 合约地址
  demosManagement.target,        // DemosManagement 合约地址
  activitiesManagement.target,   // ActivitiesManagement 合约地址
  authorityManagement.target     // AuthorityManagement 合约地址
]);
await demosJudgement.waitForDeployment();
```

## 合约地址更新

如果需要更新依赖合约的地址，可以使用各合约提供的更新方法：

- ActivitiesManagement: `updateDependencies(address)`
- DemosManagement: `updateDependencies(address, address)`
- JudgementManagement: `updateDependencies(address)`
- PrizesManagement: `updateDependencies(address)`
- DemosJudgement: `updateDependencies(address, address, address, address)`

## 验证部署

部署完成后，可以通过以下方式验证：

1. 检查所有合约是否成功部署并获得地址
2. 验证合约之间的依赖关系是否正确设置
3. 测试基本功能，如创建活动、添加管理员等