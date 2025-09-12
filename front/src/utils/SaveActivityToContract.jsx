import {ethers} from 'ethers';
import ActivitiesManagement from './contracts/ActivitiesManagement.json';

const saveActivityToContract = async (dataCID,topic,maxParticipants,timestamps) => {
    const CONTRACT_ADDRESS = "0x1c2318b7415e369FeF9f66Af29E08DF51B5FFdDd";

    try {
        const {ethereum} = window;
        if(!ethereum){
            console.log("Ethereum object not found");
            return;
        }
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ActivitiesManagement.abi, signer);

        // 创建一个 Promise 来处理事件监听和交易
        return new Promise(async (resolve, reject) => {
            let timeoutId;
            
            try {
                // 设置事件监听器
                const eventFilter = contract.filters.ActivityCreated();
                const listener = (eventPayload) => {
                    // 从事件中获取 activityId（第一个参数）
                    const activityId = eventPayload.args[0];
                    console.log("原始活动 ID:", activityId);
                    
                    // 将 BigInt 转换为数字
                    const activityIdNumber = Number(activityId);
                    console.log("转换后的活动 ID:", activityIdNumber);

                    // 清除超时定时器并移除监听器
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    contract.off(eventFilter, listener);

                    // 返回数字类型的 activityId
                    resolve(activityIdNumber);
                };

                // 添加事件监听器
                contract.on(eventFilter, listener);

                console.log("正在调用合约函数...");
                const response = await contract.createActivity(
                    dataCID,
                    topic,
                    maxParticipants,
                    0,
                    timestamps.hackthonStart,
                    timestamps.hackthonEnd,
                    timestamps.votingStart,
                    timestamps.votingEnd,
                    timestamps.registrationStart,
                    timestamps.registrationEnd
                );

                console.log("交易已发送，等待确认...");
                await response.wait();
                console.log("交易已确认:", response.hash);

                // 设置超时处理
                timeoutId = setTimeout(() => {
                    contract.off(eventFilter, listener);
                    reject(new Error("等待 ActivityCreated 事件超时"));
                }, 60000); // 60秒超时
            } catch (error) {
                console.error("合约调用出错:", error);
                // 清理定时器
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                // 确保移除事件监听器
                contract.off(eventFilter, listener);
                reject(error);
            }
        });
    } catch (error) {
        console.error("初始化合约出错:", error);
        throw error;
    }
}

export default saveActivityToContract;