import {ethers} from 'ethers';
import ActivitiesManagement from './contracts/ActivitiesManagement.json';

const registerToHackathon = async (activityId) => {
    const CONTRACT_ADDRESS = "0x1c2318b7415e369FeF9f66Af29E08DF51B5FFdDd";

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
export default registerToHackathon;