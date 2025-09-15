import {ethers} from 'ethers';
import DemosMangement from './contracts/DemosManagement.json';

const saveDemoToContract = async (dataCID,activityId) => {
    const CONTRACT_ADDRESS = "0x951e6a4C59f5a866876094Bba4dE8d32ACF1E454";

    try{
        const {ethereum} = window;
        if(!ethereum){
            console.log("Ethereum object not found");
            return;
        }
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, DemosMangement.abi, signer);

        console.log("try to call function on contract");
        const response = await contract.submitDemo(
            dataCID,
            activityId
        );
        await response.wait();
        console.log("response:",response);
    }catch(error){
        console.error("Error saving to contract:", error);
        throw error;
    }
}
export default saveDemoToContract;