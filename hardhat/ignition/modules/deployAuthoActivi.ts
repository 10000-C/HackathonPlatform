import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HackthonPlatformModule = buildModule("HackthonPlatformModule", (m) => {
  // 部署 AuthorityManagement 合约
  const authorityManagement = m.contract("AuthorityManagement", []);

  // 使用 AuthorityManagement 合约地址作为参数部署 ActivitiesManagement 合约
  const activitiesManagement = m.contract("ActivitiesManagement", [
    authorityManagement,
  ]);

  return { authorityManagement, activitiesManagement };
});

export default HackthonPlatformModule;