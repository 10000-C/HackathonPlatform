import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EXISTING_AUTHORITY_MANAGEMENT = "0xf0Cfe10D3F6277a868679EDF2b899bd57F5E8b2e";
const EXISTING_ACTIVITIES_MANAGEMENT = "0x1c2318b7415e369FeF9f66Af29E08DF51B5FFdDd";

export default buildModule("RedeployJudgementAndDemos", (m) => {
  // 重新部署 JudgementManagement
  const judgementManagement = m.contract(
    "JudgementManagement",
    [EXISTING_ACTIVITIES_MANAGEMENT, EXISTING_AUTHORITY_MANAGEMENT]
  );

  // 重新部署 DemosManagement
  const demosManagement = m.contract(
    "DemosManagement",
    [EXISTING_ACTIVITIES_MANAGEMENT, EXISTING_AUTHORITY_MANAGEMENT]
  );

  // 返回新部署的合约
  return {
    judgementManagement,
    demosManagement,
  };
});
