import CreateProjectHeader from '../components/CreateProject/CreateProjectHeader';
import CreateProjectOverview from '../components/CreateProject/CreateProjectOverview';
import CreateProjectSidebar from '../components/CreateProject/CreateProjectSidebar';
import TechStackStep from '../components/CreateProject/TechStackStep';
// import HackathonStep from '../components/CreateProject/HackathonStep';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function CreateProjectPage() {
  const { activityId } = useParams();
  const [currentStep, setCurrentStep] = useState('overview');
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    logo: null,
    shortDescription: '',
    fullDescription: '',
    progressDescription: '',
    fundraisingStatus: '',
    githubLink: '',
    techStack: [],
    sectors: {
      id: '',
      name: ''
    },
    hackathonDescription: '',
    participationRequirements: '',
    videoLink: '',
  });

  const progressRef = useRef(0);

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // 处理步骤变更
  const handleStepChange = (newStep) => {
    setCurrentStep(newStep);
  };

  const renderCurrentStep = () => {
    const commonProps = {
      formData,
      updateFormData,
      setCurrentStep: handleStepChange,
      currentStep,
      activityId
    };

    switch (currentStep) {
      case 'overview':
        return <CreateProjectOverview {...commonProps} />;
      case 'techstack':
        return <TechStackStep {...commonProps} />;
      // case 'hackathon':
      //   return <HackathonStep {...commonProps} />;
      default:
        return <CreateProjectOverview {...commonProps} />;
    }
  };

  const getStepProgress = () => {
    const steps = ['overview', 'techstack'];
    return ((steps.indexOf(currentStep) + 1) / steps.length) * 100;
  };

  // 平滑进度条动画
  useEffect(() => {
    const targetProgress = getStepProgress();
    const duration = 300; // 动画持续时间（毫秒）
    const startTime = performance.now();

    const animateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // 使用缓动函数使动画更自然
      const easeOutQuad = 1 - Math.pow(1 - progressRatio, 2);
      const currentProgress = progressRef.current + (targetProgress - progressRef.current) * easeOutQuad;
      
      setProgress(currentProgress);
      
      if (progressRatio < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        progressRef.current = targetProgress;
      }
    };

    progressRef.current = progress;
    requestAnimationFrame(animateProgress);
  }, [currentStep]);

  return (
    <div className="flex h-screen bg-[#1b1b1e]">
      <div className="flex flex-col flex-1">
        {/* 顶部全宽导航栏 */}
        <CreateProjectHeader 
          currentStep={currentStep}
          formData={formData}
          activityId={activityId}
        />
        <div className="flex flex-1 overflow-hidden">
          {/* 左侧步骤导航栏 */}
          <CreateProjectSidebar 
            currentStep={currentStep} 
            setCurrentStep={handleStepChange}
          />
          <div className="flex-1 flex flex-col">
            {/* 顶部进度条 */}
            <div className="h-1 bg-[#2b3640] w-full">
              <div 
                className="h-full bg-[#0092ff] transition-none duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex-1 overflow-y-auto hide-scrollbar mx-30">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}