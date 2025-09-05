# Hackthon Platform 智能合约文档

## 项目概述

Hackthon Platform 是一个基于以太坊的去中心化黑客松管理平台智能合约系统。该平台允许组织者创建和管理黑客松活动，参与者提交项目演示，评委对项目进行评分，以及管理员进行奖项分配。

## 核心功能

1. **权限管理** - 管理不同角色（所有者、管理员、组织者、评委、普通用户）的权限
2. **活动管理** - 创建、更新、删除和管理黑客松活动
3. **演示管理** - 参与者提交和更新项目演示
4. **评审管理** - 评委邀请和注册系统，以及项目评分
5. **奖项管理** - 配置和管理奖项分配规则

## 架构设计

项目采用模块化设计，将功能分解为以下核心合约：

- [AuthorityManagement](#authoritymanagement) - 权限管理合约
- [ActivitiesManagement](#activitiesmanagement) - 活动管理合约
- [DemosManagement](#demosmanagement) - 演示管理合约
- [JudgementManagement](#judgementmanagement) - 评审管理合约
- [PrizesManagement](#prizesmanagement) - 奖项管理合约
- [DemosJudgement](#demosjudgement) - 演示评分合约

## 部署顺序

由于合约之间存在依赖关系，部署时需要按照以下顺序进行：

1. AuthorityManagement
2. ActivitiesManagement
3. DemosManagement
4. JudgementManagement
5. PrizesManagement
6. DemosJudgement

后续合约的地址需要作为参数传递给依赖它的合约。