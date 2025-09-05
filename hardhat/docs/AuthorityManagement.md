# AuthorityManagement 合约文档

## 合约概述

AuthorityManagement 合约负责管理平台中的所有权限控制。它定义了不同角色（所有者、管理员、组织者、被封禁用户）并提供相应的权限验证功能。

## 合约地址

`contracts/AuthorityManagement.sol`

## 数据结构

### 角色映射

- `authority` - 管理员地址映射
- `isBlocked` - 被封禁用户地址映射
- `isOrganizer` - 组织者地址映射

## 核心功能

### 角色管理

#### 添加管理员
```solidity
function addAdmin(address _admin) public onlyOwner
```
为指定地址添加管理员权限，仅所有者可调用。

#### 移除管理员
```solidity
function removeAdmin(address _admin) public onlyOwner
```
移除指定地址的管理员权限，仅所有者可调用。

#### 检查管理员
```solidity
function isAdmin(address _admin) public view returns (bool)
```
检查指定地址是否具有管理员权限。

### 用户封禁管理

#### 封禁用户
```solidity
function blockUser(address _user) public onlyAdmin
```
封禁指定用户，阻止其参与活动，仅管理员可调用。

#### 解封用户
```solidity
function unblockUser(address _user) public onlyAdmin
```
解封指定用户，允许其重新参与活动，仅管理员可调用。

#### 检查用户封禁状态
```solidity
function isBlockedUser(address _user) public view returns (bool)
```
检查指定用户是否被封禁。

### 组织者管理

#### 添加组织者
```solidity
function addOrganizer(address _organizer) public onlyAdmin
```
为指定地址添加组织者权限，仅管理员可调用。

#### 移除组织者
```solidity
function removeOrganizer(address _organizer) public onlyAdmin
```
移除指定地址的组织者权限，仅管理员可调用。

#### 检查组织者
```solidity
function isAnOrganizer(address _organizer) public view returns (bool)
```
检查指定地址是否具有组织者权限。

### 所有者管理

#### 获取所有者地址
```solidity
function getOwner() public view returns (address)
```
返回合约所有者地址。

## 权限修饰符

### onlyOwner
确保调用者是合约所有者。

### onlyAdmin
确保调用者具有管理员权限。

## 事件

### AdminAdded
管理员添加事件
```solidity
event AdminAdded(address indexed admin)
```

### AdminRemoved
管理员移除事件
```solidity
event AdminRemoved(address indexed admin)
```

### UserBlocked
用户封禁事件
```solidity
event UserBlocked(address indexed user)
```

### UserUnblocked
用户解封事件
```solidity
event UserUnblocked(address indexed user)
```