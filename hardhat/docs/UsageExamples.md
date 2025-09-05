# 使用示例

## 概述

本文档提供 Hackthon Platform 智能合约系统的使用示例，帮助开发者理解如何与各个合约交互。

## 角色说明

平台涉及以下角色：

1. **所有者 (Owner)** - 部署合约的地址，拥有最高权限
2. **管理员 (Admin)** - 由所有者添加，可以管理组织者和封禁用户
3. **组织者 (Organizer)** - 由管理员添加，可以创建和管理活动
4. **参与者 (Participant)** - 参与活动的用户
5. **评委 (Judge)** - 对演示进行评分的专家

## 完整流程示例

### 1. 权限设置

所有者添加管理员：
```javascript
await authorityManagement.addAdmin(adminAddress);
```

管理员添加组织者：
```javascript
await authorityManagement.addOrganizer(organizerAddress);
```

### 2. 创建活动

组织者创建新活动：
```javascript
await activitiesManagement.createActivity(
  "QmHash1",     // 活动数据CID (IPFS)
  "AI Hackthon", // 活动主题
  100,           // 最大参与人数
  0              // 当前参与人数
);
```

### 3. 配置奖项

组织者为活动配置奖项：
```javascript
await prizesManagement.addPrizeInfo(
  1,                           // 活动ID
  2,                           // 组别数量
  [3, 5],                      // 各组别获奖人数
  [["创新性", "实用性"], ["创新性", "实用性", "技术难度"]],  // 各组别评判标准
  [[10, 10], [10, 10, 10]],   // 各标准分数
  [1000, 2000]                // 各组别奖金
);
```

### 4. 用户参与活动

用户参与活动：
```javascript
await activitiesManagement.participateInActivity(1);
```

### 5. 提交演示

参与者提交演示：
```javascript
await demosManagement.submitDemo(
  1,           // 活动ID
  0,           // 组别ID
  "QmHash2",   // 演示数据CID
  "QmHash3"    // 演示视频CID
);
```

### 6. 评委管理

组织者生成评委邀请码：
```javascript
const invitationCode = await judgementManagement.createJudgeInvitation(
  1,              // 活动ID
  "Judge Name"    // 评委名称
);
```

评委使用邀请码注册：
```javascript
await judgementManagement.registerAsJudge(
  1,              // 活动ID
  invitationCode  // 邀请码
);
```

### 7. 评分演示

评委对演示进行评分：
```javascript
await demosJudgement.JudgeDemo(
  1,          // 活动ID
  0,          // 演示ID
  [8, 9]      // 各项得分
);
```

## 常用功能示例

### 查询活动信息
```javascript
const activity = await activitiesManagement.getActivity(1);
console.log("活动信息:", activity);
```

### 检查参与状态
```javascript
const isParticipant = await activitiesManagement.isParticipantInActivity(1, userAddress);
console.log("是否参与者:", isParticipant);
```

### 获取演示组别
```javascript
const cohortId = await demosManagement.getDemoCohortId(1, 0);
console.log("组别ID:", cohortId);
```

### 获取组别信息
```javascript
const cohort = await prizesManagement.getCohort(1, 0);
console.log("组别信息:", cohort);
```

### 检查评委资格
```javascript
const isJudge = await judgementManagement.isJudgeInActivity(1, judgeAddress);
console.log("是否评委:", isJudge);
```

## 事件监听示例

监听活动创建事件：
```javascript
activitiesManagement.on("ActivityCreated", (activityId, activity, event) => {
  console.log(`活动创建: ID=${activityId}, 主题=${activity.topic}`);
});
```

监听演示提交事件：
```javascript
demosManagement.on("DemoSubmitted", (activityId, demo, event) => {
  console.log(`演示提交: 活动ID=${activityId}, 演示ID=${demo.demoId}`);
});
```

监听评分事件：
```javascript
demosJudgement.on("DemoJudged", (activityId, demoId, totalScore, numOfJudges, event) => {
  console.log(`演示评分: 活动ID=${activityId}, 演示ID=${demoId}, 总分=${totalScore}, 评委数=${numOfJudges}`);
});
```

## 错误处理示例

处理合约中的 require 错误：
```javascript
try {
  await activitiesManagement.createActivity("", "主题", 100, 0);
} catch (error) {
  if (error.message.includes("Not an organizer")) {
    console.log("错误: 只有组织者可以创建活动");
  }
}
```

## 权限验证示例

在前端应用中验证用户权限：
```javascript
// 检查是否为管理员
const isAdmin = await authorityManagement.isAdmin(userAddress);

// 检查是否为组织者
const isOrganizer = await authorityManagement.isAnOrganizer(userAddress);

// 检查是否被封禁
const isBlocked = await authorityManagement.isBlockedUser(userAddress);

// 检查是否为评委
const isJudge = await judgementManagement.isJudgeInActivity(activityId, userAddress);
```

这些示例展示了平台的主要功能和交互方式。开发者可以根据具体需求调整参数和流程。