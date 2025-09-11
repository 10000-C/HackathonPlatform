import {ethers} from 'ethers';
import ActivitiesManagement from './contracts/ActivitiesManagement.json';

const saveActivityToContract = async (dataCID,topic,maxParticipants) => {
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

        console.log("try to call function on contract");
        const response = await contract.createActivity(
            dataCID,
            topic,
            maxParticipants,
            0
        );
        await response.wait();
        console.log("response:",response);
    }catch(error){
        console.error("Error saving to contract:", error);
        throw error;
    }
}
export default saveActivityToContract;