import { Link } from 'react-router-dom';

export default function CreateHackathonHeader({ currentStep, isPublished, setIsPublished, formData }) {
  const handlePublish = () => {
    if (currentStep === 'schedule') {
      // 这里可以添加表单验证
      setIsPublished(true);
      // TODO: 添加数据上传逻辑
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