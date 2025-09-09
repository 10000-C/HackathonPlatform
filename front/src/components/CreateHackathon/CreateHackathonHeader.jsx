import { Link } from 'react-router-dom';

export default function CreateHackathonHeader({ currentStep, isPublished, setIsPublished, formData }) {
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

  const handlePublish = () => {
    if (currentStep === 'schedule') {
      if (validateForm()) {
        setIsPublished(true);
        alert("Hackathon successfully published!");
        // TODO: 添加数据上传逻辑
      }
    }
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-[#2b3640] bg-[#1b1b1e]">
      <Link to="/hackathons" className="text-[#949fa8] hover:text-white flex items-center">
        <span>←</span>
        <span className="ml-1">Save hackathon draft & quit</span>
      </Link>
      <div className="flex items-center gap-4">
        <button 
          onClick={handlePublish}
          disabled={currentStep !== 'schedule' || isPublished}
          className={`${
            currentStep === 'schedule' && !isPublished
              ? 'bg-[#0092ff] hover:bg-[#0092ff]/90'
              : 'bg-gray-500 cursor-not-allowed'
          } text-white px-4 py-2 rounded-lg transition-colors`}
        >
          {isPublished ? 'Published' : 'Publish Hackathon'}
        </button>
      </div>
    </div>
  );
}