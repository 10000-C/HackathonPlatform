import {ethers} from 'ethers';
import ActivitiesManagement from './ActivitiesManagement.json'

const saveToContract = async (dataCID,topic,maxParticipants) => {
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
export default saveToContract;