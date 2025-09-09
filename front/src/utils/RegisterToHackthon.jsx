import {ethers} from 'ethers';
import ActivitiesManagement from './contracts/ActivitiesManagement.json';

const registerToHackthon = async (activityId) => {
    const CONTRACT_ADDRESS = "0xC91cfB0Ab5EA34e350bb2cC4Eb360Ddeb05a1552";

    try{
       const {ethereum} = window;
        if(!ethereum){
            console.log("Ethereum object not found");
            return;
        }
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ActivitiesManagement.abi, signer);

        const txn = await contract.participateInActivity(activityId);
        await txn.wait();
        console.log("Registered to hackthon:", txn);
    }catch(error){
        console.log(error);
        throw error;
    }
}
export default registerToHackthon;