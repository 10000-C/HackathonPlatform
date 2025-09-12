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
                const listener = (activityId, activity, event) => {
                    console.log("检测到 ActivityCreated 事件：");
                    console.log("活动 ID:", activityId.toString());
                    console.log("活动数据:", activity);

                    // 清除超时定时器
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }

                    // 移除事件监听器
                    contract.off(eventFilter, listener);

                    // 返回结果
                    resolve({
                        activityId: activityId,
                        activity: {
                            dataCID: activity.dataCID,
                            topic: activity.topic,
                            creator: activity.creator,
                            maxParticipants: activity.maxParticipants.toString(),
                            cuParticipants: activity.cuParticipants.toString()
                        },
                        transactionHash: event.transactionHash,
                        blockNumber: event.blockNumber
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
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                reject(error);
            }
        });
    } catch (error) {
        console.error("初始化合约出错:", error);
        throw error;
    }
}

export default saveActivityToContract;