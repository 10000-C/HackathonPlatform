import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("HackathonPlatformDeployment", (m) => {
  // 1. 部署 AuthorityManagement - 最基础的权限管理合约
  const authorityManagement = m.contract("AuthorityManagement");

  // 2. 部署 ActivitiesManagement - 依赖 AuthorityManagement
  const activitiesManagement = m.contract(
    "ActivitiesManagement",
    [authorityManagement]
  );

  // 3. 部署 JudgementManagement - 依赖 AuthorityManagement 和 ActivitiesManagement
  const judgementManagement = m.contract(
    "JudgementManagement",
    [activitiesManagement, authorityManagement]
  );

  // 4. 部署 DemosManagement - 依赖 ActivitiesManagement, JudgementManagement 和 AuthorityManagement
  const demosManagement = m.contract(
    "DemosManagement",
    [activitiesManagement, judgementManagement, authorityManagement]
  );

  // 5. 部署 PrizesManagement - 只依赖 ActivitiesManagement
  const prizesManagement = m.contract(
    "PrizesManagement",
    [activitiesManagement]
  );

  // 6. 最后部署 DemosJudgement - 依赖所有其他合约
  const demosJudgement = m.contract(
    "DemosJudgement",
    [
      prizesManagement,
      judgementManagement,
      demosManagement,
      activitiesManagement,
      authorityManagement,
    ]
  );

  // 返回所有部署的合约，方便后续访问
  return {
    authorityManagement,
    activitiesManagement,
    judgementManagement,
    demosManagement,
    prizesManagement,
    demosJudgement,
  };
});
