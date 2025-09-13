import React from 'react';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import registerToHackathon from '../../utils/RegisterToHackathon';

const HackathonSidebar = ({ hackathon }) => {
  // 确保 timeLeft 存在，如果不存在则提供默认值
  const timeLeft = hackathon.timeLeft || { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const [registering, setRegistering] = useState(false);
  
  const handleRegister = async() => {
    try {
        setRegistering(true);
        const activityId = hackathon.id;
        const response = await registerToHackathon(activityId);
        console.log("Register response:",response);
    } catch(error) {
        console.error("Error registering to hackathon:",error);
    } finally {
        setRegistering(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Registration countdown */}
      <div className="border-2 border-solid border-[#242425] rounded-lg p-6">
        <h3 className="text-base font-medium text-white mb-4">Left to register</h3>
        
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="bg-[#0092ff1a] p-2 rounded text-center">
            <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
            <div className="text-xs text-white/60">D</div>
          </div>
          <div className="bg-[#0092ff1a] p-2 rounded text-center">
            <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
            <div className="text-xs text-white/60">H</div>
          </div>
          <div className="bg-[#0092ff1a] p-2 rounded text-center">
            <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
            <div className="text-xs text-white/60">M</div>
          </div>
          <div className="bg-[#0092ff1a] p-2 rounded text-center">
            <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
            <div className="text-xs text-white/60">S</div>
          </div>
        </div>
        
        <button 
          className="w-full bg-[#0092ff] text-white py-4 px-4 rounded-lg text-base font-medium inline-flex items-center justify-center transform transition-all duration-200 hover:scale-105 active:scale-95"
          onClick={() => handleRegister()}
          disabled={registering}
        >
          {registering ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Registering...
            </>
          ) : (
            'Register to Hackathon'
          )}
        </button>
      </div>
      
      
      {/* Hackathon Info */}
      <div className="border-2 border-solid border-[#242425] rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#949fa8]/60 text-sm">Registration</span>
            <span className="text-white text-sm text-right">{timeLeft.days} days left</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#949fa8]/60 text-sm">Tech stack</span>
            <span className="text-white text-sm text-right">{hackathon.techStack}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#949fa8]/60 text-sm">Level</span>
            <span className="text-white text-sm text-right">{hackathon.level}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#949fa8]/60 text-sm">Total Prize</span>
            <span className="text-white text-sm text-right">{hackathon.prizePool}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#949fa8]/60 text-sm">Location</span>
            <span className="text-white text-sm text-right">{hackathon.location}</span>
          </div>
        </div>
        
        <div className="border-b border-[#0092ff1a] my-4"></div>
        
        <div>
          <h4 className="text-[#949fa8]/60 text-sm mb-4">Links</h4>
          <div className="flex space-x-4">
            <a href={hackathon.links.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-solid border-[#242425] rounded flex items-center justify-center">
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                <path d="M17.751 1.89305C17.1099 2.21545 16.4255 2.42505 15.7287 2.53385C16.4624 2.03105 17.0109 1.23905 17.2783 0.298046C16.5783 0.771446 15.8108 1.10385 15.0156 1.28985C14.4833 0.666183 13.7855 0.244249 13.0222 0.0868459C12.2589 -0.0705571 11.4721 0.0453288 10.7782 0.414223C10.0843 0.783117 9.52123 1.38344 9.17669 2.12872C8.83215 2.87399 8.72499 3.72283 8.87307 4.53905C7.39914 4.46465 5.95816 4.07745 4.63366 3.40617C3.30916 2.73489 2.12963 1.79361 1.16707 0.653846C0.860073 1.19745 0.69207 1.82545 0.69207 2.49385C0.69132 3.09098 0.832531 3.67938 1.10388 4.20818C1.37522 4.73699 1.76986 5.19021 2.25047 5.52545C1.69936 5.50665 1.15969 5.34385 0.68047 5.05145V5.10145C0.68037 5.96408 0.975991 6.79849 1.52348 7.46245C2.07096 8.1264 2.84172 8.58355 3.70647 8.75145C3.19554 8.90225 2.65855 8.92545 2.13847 8.81905C2.37312 9.55822 2.8338 10.1998 3.45389 10.6551C4.07397 11.1103 4.82282 11.3549 5.59367 11.3505C4.25079 12.4195 2.60328 12.9992 0.90447 12.9965C0.602212 12.9966 0.300189 12.9779 0 12.9405C1.72656 14.0705 3.73753 14.6704 5.79247 14.6685C12.7456 14.6685 16.5492 9.00665 16.5492 4.08545C16.5492 3.92385 16.5448 3.76065 16.537 3.59985C17.2348 3.03227 17.8364 2.32718 18.3128 1.52225C17.6638 1.82945 16.9682 2.03265 16.2509 2.12305L16.2532 2.12545C17.0131 1.65305 17.5768 0.87425 17.751 1.89305Z" fill="white"/>
              </svg>
            </a>
            <a href={hackathon.links.discord} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-solid border-[#242425] rounded flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                <path d="M15.2027 3.36563C14.0998 2.84996 12.9137 2.46559 11.6748 2.24996C11.649 2.24996 11.6232 2.26266 11.6103 2.28806C11.4631 2.56173 11.298 2.91066 11.1851 3.18433C9.85687 2.98139 8.53446 2.98139 7.23789 3.18433C7.12496 2.90496 6.95136 2.56173 6.80421 2.28806C6.7913 2.26266 6.76553 2.24996 6.73976 2.24996C5.50086 2.46559 4.31468 2.84996 3.21188 3.36563C3.20114 3.36563 3.19041 3.37646 3.18183 3.39016C0.468112 7.45743 -0.280111 11.4232 0.0868465 15.3398C0.0868465 15.3653 0.10073 15.3907 0.120886 15.4063C1.60831 16.5041 3.04489 17.1736 4.45785 17.6247C4.48362 17.6327 4.50939 17.622 4.52655 17.6013C4.86134 17.1395 5.16047 16.6543 5.41829 16.1457C5.43545 16.1107 5.4183 16.0676 5.38279 16.0548C4.90918 15.8801 4.45785 15.6664 4.02369 15.425C3.98819 15.4045 3.98414 15.3535 4.01476 15.3279C4.10739 15.2599 4.20002 15.1893 4.2885 15.1185C4.30566 15.1047 4.32996 15.1028 4.35142 15.1128C7.25505 16.4243 10.3751 16.4243 13.2326 15.1128C13.2541 15.1009 13.2784 15.1028 13.2975 15.1166C13.386 15.1873 13.4786 15.2599 13.5731 15.3279C13.6037 15.3535 13.6016 15.4045 13.5642 15.425C13.13 15.6722 12.6787 15.8801 12.205 16.0529C12.1695 16.0657 12.1544 16.1107 12.1715 16.1457C12.4369 16.6524 12.736 17.1375 13.0613 17.5993C13.0785 17.622 13.1062 17.6327 13.1319 17.6247C14.5571 17.1736 15.9937 16.5041 17.4811 15.4063C17.5013 15.3907 17.5131 15.3672 17.5131 15.3417C17.9474 10.8459 16.7891 6.91319 15.2209 3.39206C15.2144 3.37646 15.2037 3.36563 15.2027 3.36563ZM5.87984 12.9599C5.01235 12.9599 4.29848 12.1724 4.29848 11.2083C4.29848 10.2443 4.99948 9.45679 5.87984 9.45679C6.76875 9.45679 7.47977 10.2519 7.46689 11.2083C7.46689 12.1724 6.76017 12.9599 5.87984 12.9599ZM12.1322 12.9599C11.2647 12.9599 10.5508 12.1724 10.5508 11.2083C10.5508 10.2443 11.2518 9.45679 12.1322 9.45679C13.0211 9.45679 13.7321 10.2519 13.7192 11.2083C13.7192 12.1724 13.0211 12.9599 12.1322 12.9599Z" fill="white"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Project Quests */}
      <div className="border-2 border-solid border-[#242425] rounded-lg p-6">
        <h3 className="text-base font-medium text-white mb-4">Project Quests</h3>
        
        <div className="border-b border-[#0092ff1a] mb-4"></div>
        
        <div className="space-y-5">
          {(hackathon.quests || []).map((quest, index) => (
            <div key={quest.id} className="flex justify-between items-center">
              <span className="text-white text-sm">{quest.title}</span>
              {quest.completed ? (
                <div className="w-4 h-4 rounded-full bg-[#14b92d] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full border border-solid border-[#242425]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackathonSidebar;
