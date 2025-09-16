import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import saveToIPFS from '../../utils/SaveToIPFS';
import saveDemoToContract from '../../utils/SaveDemoToContract';
export default function CreateProjectHeader({ currentStep, formData, activityId }) {
  // 计算完成百分比
  const getCompletionPercentage = () => {
    const steps = ['overview', 'techstack'];
    const currentStepIndex = steps.indexOf(currentStep);
    return Math.floor(((currentStepIndex + 1) / steps.length) * 100);
  };

  // 验证表单数据
  const validateFormData = () => {
    const requiredFields = {
      name: 'Project Name',
      logo: 'Project Logo',
      shortDescription: 'Project Introduction',
      fullDescription: 'Full Description',
      progressDescription: 'Hackathon Progress',
      fundraisingStatus: 'Fundraising Status',
      sectors: 'Sector'
    };

    const missingFields = [];

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (field === 'sectors') {
        // Check if array is empty
        if (!formData[field] || formData[field].length === 0) {
          missingFields.push(label);
        }
      } else if (field === 'logo') {
        // Check if logo object exists and has file property
        if (!formData[field] || !formData[field].file) {
          missingFields.push(label);
        }
      } else {
        // Check if other fields are empty
        if (!formData[field] || formData[field].trim() === '') {
          missingFields.push(label);
        }
      }
    });

    if (missingFields.length > 0) {
      const errorMessage = `Please fill in the following required fields:\n${missingFields.join('\n')}`;
      alert(errorMessage);
      return false;
    }

    return true;
  };

  // 保存草稿并退出
  const handleSaveDraftAndQuit = () => {
    window.location.href = '/hackathons';
  };

  // 创建项目
  const handleCreateProject = async() => {
    if (!validateFormData()) {
      return;
    }
    try{
      const imageCID = await saveToIPFS(formData.logo.file);
      formData.logo = imageCID;

      const dataBlob = new Blob([JSON.stringify(formData)], { type: 'application/json' });
      const dataCID = await saveToIPFS(dataBlob);

      const corhotID = formData.sectors[0]; // sectors 是一个数组，我们取第一个选择的sector
      await saveDemoToContract(dataCID,corhotID,activityId);
      console.log("Project created successfully");
    }catch(error){
      console.error("Error creating project:", error);
      return;
    }
    
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-[#2b3640] bg-[#1b1b1e]">
      {/* 左侧：保存草稿和退出按钮 */}
      <button 
        onClick={handleSaveDraftAndQuit}
        className="text-white hover:text-white flex items-center"
      >
        <X className="w-5 h-5 mr-2" />
        <span>quit</span>
      </button>

      {/* 中间：创建新项目标题 */}
      <div className="flex items-center gap-4"> 
        <div className="text-white text-lg font-bold">
          Create New Project
        </div>
      </div>

      {/* 右侧：完成百分比和创建项目按钮 */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleCreateProject}
          className="bg-[#0092ff] hover:bg-[#0092ff]/90 text-white px-4 py-2 rounded-lg"
        >
          Create Project
        </button>
      </div>
    </div>
  );
}