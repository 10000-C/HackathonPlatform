import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function CreateProjectHeader({ currentStep, formData }) {
  // 计算完成百分比
  const getCompletionPercentage = () => {
    const steps = ['overview', 'techstack'];
    const currentStepIndex = steps.indexOf(currentStep);
    return Math.floor(((currentStepIndex + 1) / steps.length) * 100);
  };

  // 保存草稿并退出
  const handleSaveDraftAndQuit = () => {
    // 这里可以实现保存草稿的逻辑
    // 暂时只做导航
    window.location.href = '/hackathons';
  };

  // 创建项目
  const handleCreateProject = () => {
    // 实现创建项目逻辑
    alert('Project creation functionality will be implemented soon!');
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-[#2b3640] bg-[#1b1b1e]">
      {/* 左侧：保存草稿和退出按钮 */}
      <button 
        onClick={handleSaveDraftAndQuit}
        className="text-white hover:text-white flex items-center"
      >
        <X className="w-5 h-5 mr-2" />
        <span>Save project draft & quit</span>
      </button>

      {/* 中间：创建新项目标题 */}
      <div className="flex items-center gap-4"> 
        <div className="text-white text-lg font-bold">
          Create New Project
        </div>
      </div>

      {/* 右侧：完成百分比和创建项目按钮 */}
      <div className="flex items-center gap-4">
        <span className="text-[#F44E4E] text-sm font-medium">
          {getCompletionPercentage()}% completed
        </span>
        <button 
          onClick={handleCreateProject}
          className="bg-[#0092ff40] text-white px-4 py-2 rounded-lg"
        >
          Create Project
        </button>
      </div>
    </div>
  );
}