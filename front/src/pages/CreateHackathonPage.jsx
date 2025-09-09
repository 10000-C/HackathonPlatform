import CreateHackathonHeader from '../components/CreateHackathon/CreateHackathonHeader';
import CreateHackathonOverview from '../components/CreateHackathon/CreateHackathonOverview';
import CreateHackathonSidebar from '../components/CreateHackathon/CreateHackathonSidebar';
import PrizesStep from '../components/CreateHackathon/PrizesStep';
import JudgesStep from '../components/CreateHackathon/JudgeStep';
import ScheduleStep from '../components/CreateHackathon/ScheduleStep';
import { useState, useEffect, useRef } from 'react';

export default function CreateHackathonPage() {
  const [currentStep, setCurrentStep] = useState('overview');
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    fullDescription: '',
    registrationStart: '',
    registrationEnd: '',
    hackathonStart: '',
    hackathonEnd: '',
    votingStart: '',
    votingEnd: '',
    techStack: '',
    experienceLevel: '',
    location: '',
    socialLinks: [{ platform: '.com', link: '' }],
    prizeCorhots: [],
    judges: [],
    schedule: [],
    showPrizeDetails: false
  });

  const [judges, setJudges] = useState([
   
  ]);

  const progressRef = useRef(0);

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const renderCurrentStep = () => {
    const commonProps = {
      formData,
      updateFormData,
      setCurrentStep
    };

    switch (currentStep) {
      case 'overview':
        return <CreateHackathonOverview {...commonProps} />;
      case 'prizes':
        return <PrizesStep {...commonProps} />;
      case 'judges':
        return <JudgesStep {...commonProps} judges={judges} setJudges={setJudges} />;
      case 'schedule':
        return <ScheduleStep {...commonProps} />;
      default:
        return <CreateHackathonOverview {...commonProps} />;
    }
  };

  const getStepProgress = () => {
    const steps = ['overview', 'prizes', 'judges', 'schedule'];
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
        <CreateHackathonHeader />
        <div className="flex flex-1 overflow-hidden">
          {/* 左侧步骤导航栏 */}
          <CreateHackathonSidebar 
            currentStep={currentStep} setCurrentStep={setCurrentStep}
          />
          <div className="flex-1 flex flex-col">
            {/* 顶部进度条 */}
            <div className="h-1 bg-[#2b3640] w-full">
              <div 
                className="h-full bg-[#0092ff] transition-none duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {renderCurrentStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}