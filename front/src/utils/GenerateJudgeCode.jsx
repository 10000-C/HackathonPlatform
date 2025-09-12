import {ethers} from "ethers";
import JudgementManagement from "./contracts/JudgementManagement.json"

const generateJudgeCode = async (activityId,email) => {
  const CONTRACT_ADDRESS = "0xFe09E101a92EEcE4Bc40F6d9aE8eAA2AE2F90B8a";

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, JudgementManagement.abi, signer);

  try {
    const tx = await contract.createJudgeInvitation(activityId,email);
    const response =  await tx.wait();
    console.log("Judge code generated successfully:", response);
    return response;
  } catch (error) {
    console.error("Error generating judge code:", error);
  }
};
export default generateJudgeCode;