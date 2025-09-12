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
                    console.log("检测到 ActivityCreated 事件，原始参数：", eventPayload);
                    
                    // 从 args 中获取事件参数
                    const args = eventPayload.args;
                    console.log("事件参数：", args);
                    
                    // activityId 是第一个参数
                    const activityId = args[0];  // BigNumber
                    // activity 结构是第二个参数
                    const activity = args[1];    // Activity struct
                    
                    console.log("活动 ID:", activityId ? activityId.toString() : 'undefined');
                    console.log("活动数据:", activity);

                    // 清除超时定时器
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }

                    // 移除事件监听器
                    contract.off(eventFilter, listener);

                    // 返回结果
                    resolve({
                        activityId: activityId ,
                        activity: activity ? {
                            dataCID: activity.dataCID || '',
                            topic: activity.topic || '',
                            creator: activity.creator || '',
                            maxParticipants: activity.maxParticipants ? activity.maxParticipants.toString() : '0',
                            cuParticipants: activity.cuParticipants ? activity.cuParticipants.toString() : '0'
                        } : null,
                        transactionHash: eventPayload.log.transactionHash,
                        blockNumber: eventPayload.log.blockNumber
                    });
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