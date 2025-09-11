import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import SaveToIPFS from '../../utils/SaveToIPFS';
import saveActivityToContract from '../../utils/SaveActivityToContract';

export default function CreateHackathonHeader({ currentStep, isPublished, setIsPublished, formData }) {
  const [uploading, setUploading] = useState(false);
  const validateForm = () => {
    // 验证概览信息
    if (!formData.name?.trim() || 
        !formData.shortDescription?.trim() || 
        !formData.fullDescription?.trim() || 
        !formData.registrationStart || 
        !formData.registrationEnd || 
        !formData.hackathonStart ||
        !formData.hackathonEnd ||
        !formData.votingStart ||
        !formData.votingEnd ||
        !formData.techStack?.trim() ||
        !formData.experienceLevel?.trim() ||
        !formData.location?.trim()) {
      alert("Please complete the basic hackathon information");
      return false;
    }

    // 验证社交链接
    if (!formData.socialLinks?.[0]?.url?.trim()) {
      alert("Please add at least one social link");
      return false;
    }

    // 验证奖项设置
    if (!formData.prizeCorhots || formData.prizeCorhots.length === 0) {
      alert("Please add at least one prize cohort");
      return false;
    }

    for (const cohort of formData.prizeCorhots) {
      if (!cohort.name?.trim() || 
          !cohort.numberOfWinners || 
          !cohort.prizeAmount?.trim() || 
          !cohort.description?.trim()) {
        alert("Please complete all prize cohort information");
        return false;
      }

      // 验证评分标准
      for (const criteria of cohort.evaluationCriteria) {
        if (!criteria.name?.trim() || 
            !criteria.points?.trim() || 
            !criteria.description?.trim()) {
          alert("Please complete all evaluation criteria information");
          return false;
        }
      }
    }

    // 验证时间安排
    if (!formData.schedule || formData.schedule.length === 0) {
      alert("Please add at least one schedule item");
      return false;
    }

    for (const slot of formData.schedule) {
      if (!slot.title?.trim() || 
          !slot.startDate || 
          !slot.startTime || 
          !slot.endDate || 
          !slot.endTime || 
          !slot.description?.trim()) {
        alert("Please complete all information for the added schedule items");
        return false;
      }
    }

    return true;
  };

  const handleSaveImage = async (file) => {
    try {
      const imageCID = await SaveToIPFS(file);
      return imageCID;
    } catch (error) {
      console.error('保存图片失败:', error);
      throw error;
    }
  };

  const convertDateToTimestamp = (dateStr) => {
    if (!dateStr) {
      console.warn('Empty date string provided');
      return 0; // 返回0而不是null，因为智能合约可能不接受null
    }
    try {
      const timestamp = Math.floor(new Date(dateStr).getTime() / 1000);
      console.log(`Converting ${dateStr} to ${timestamp}`);
      return timestamp;
    } catch (error) {
      console.error('Error converting date:', dateStr, error);
      return 0;
    }
  };

  const convertTimestampsToJson = (formData) => {
    const timestamps = {
      registrationStart: convertDateToTimestamp(formData.registrationStart),
      registrationEnd: convertDateToTimestamp(formData.registrationEnd),
      hackthonStart: convertDateToTimestamp(formData.hackathonStart),
      hackthonEnd: convertDateToTimestamp(formData.hackathonEnd),
      votingStart: convertDateToTimestamp(formData.votingStart),
      votingEnd: convertDateToTimestamp(formData.votingEnd)
    };
    
    return timestamps;
  };

  const handlePublish = async () => {
    if (currentStep === 'schedule') {
      if (validateForm()) {
        try {
          setUploading(true);
          
          // 确保banner存在且包含文件对象
          if (!formData.banner?.file) {
            throw new Error('No banner image selected');
          }

          // 1. 先上传图片到IPFS
          const imageCID = await handleSaveImage(formData.banner.file);
          
          const hackathonData = {
            ...formData,
            // 移除原始banner数据，只保留CID
            banner: imageCID
          };
  
          // 从hackathonData中删除预览URL
          delete hackathonData.banner.previewUrl;
          delete hackathonData.banner.file;
          
          const dataBlob = new Blob([JSON.stringify(hackathonData)], { type: 'application/json' });
          const dataCID = await SaveToIPFS(dataBlob);

          // 获取时间戳对象
          const timeStamps = convertTimestampsToJson(formData);
          
          // 提供maxParticipants参数，如果formData中没有则使用默认值
          const maxParticipants = formData.maxParticipants || 100;
          
          console.log("Publishing with data:", {
            dataCID,
            name: hackathonData.name,
            maxParticipants,
            timeStamps
          });
          //目前没有设置最大参加人数的选项
          await saveActivityToContract(dataCID, hackathonData.name, 9999, timeStamps);
          console.log('Activity saved to contract');
          setIsPublished(true);
          alert("Hackathon successfully published!");
        } catch (error) {
          console.error('发布失败:', error);
          alert('Failed to publish hackathon. Please try again.');
        } finally {
          setUploading(false);
        }
      }
    }
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-[#2b3640] bg-[#1b1b1e]">
      <Link to="/hackathons" className="text-[#949fa8] hover:text-white flex items-center">
        <span>←</span>
        <span className="ml-1">quit</span>
      </Link>
      <div className="flex items-center gap-4">
        <button 
          onClick={handlePublish}
          disabled={currentStep !== 'schedule' || isPublished || uploading}
          className={`${
            currentStep === 'schedule' && !isPublished
              ? 'bg-[#0092ff] hover:bg-[#0092ff]/90'
              : 'bg-gray-500 cursor-not-allowed'
          } text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center`}
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : isPublished ? (
            'Published'
          ) : (
            'Publish Hackathon'
          )}
        </button>
      </div>
    </div>
  );
}