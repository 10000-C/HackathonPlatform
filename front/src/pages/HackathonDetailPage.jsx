import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HackathonDetailLayout from '../components/HackathonDetail/HackathonDetailLayout';
import OverviewTab from '../components/HackathonDetail/OverviewTab';
import PrizesTab from '../components/HackathonDetail/PrizesTab';
import ScheduleTab from '../components/HackathonDetail/ScheduleTab';
import SubmissionsTab from '../components/HackathonDetail/SubmissionsTab';

// 模拟API调用获取黑客松详情
const fetchHackathonById = async (hackathonId) => {
  try {
    // 这里是API调用的接口
    // 例如: const response = await fetch(`/api/hackathons/${hackathonId}`);
    // const data = await response.json();
    // return data;
    
    // 暂时返回模拟数据
    return mockHackathonData;
  } catch (error) {
    console.error("Error fetching hackathon details:", error);
    return null;
  }
};

// 模拟数据，将来会被API返回的真实数据替换
const mockHackathonData = {
  id: '1',
  title: 'ChainSpark Hackathon',
  description: 'Build the future of decentralized applications',
  startDate: '2025-01-01',
  endDate: '2026-01-15',
  registrationEndDate: '2025-12-25', // 确保这个日期是未来的日期
  prizePool: '50,000.00 USD',
  location: 'Online',
  level: 'All levels',
  techStack: 'All tech stack',
  status: 'active',
  organizer: 'ChainSpark DAO',
  bannerImage: 'https://placehold.co/1600x400/121820/0092ff?text=ChainSpark+Hackathon',
  links: {
    twitter: 'https://twitter.com/chainspark',
    discord: 'https://discord.gg/chainspark'
  },
  quests: [
    { id: 1, title: 'Join Telegram Group', completed: true },
    { id: 2, title: 'Follow Tech Fairness Hackathon on X', completed: false },
    { id: 3, title: 'Join Tech Fairness Hackathon on Discord', completed: false }
  ],
  submissions: [
    {
      id: 1,
      title: 'FairData Protocol',
      team: 'DataGuardians',
      description: 'A blockchain-based data sovereignty protocol that gives users complete control over how their data is shared and used.',
      techStack: ['Solidity', 'React', 'IPFS'],
      submittedAt: '2024-01-14',
      thumbnailUrl: 'https://placehold.co/400x225/2b3640/white?text=FairData+Protocol',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      title: 'TransparAI',
      team: 'AlgoEthics',
      description: 'Open-source AI decision transparency tool that allows users to see and understand how algorithms make recommendations and decisions.',
      techStack: ['Python', 'TensorFlow', 'Vue.js'],
      submittedAt: '2024-01-13',
      thumbnailUrl: 'https://placehold.co/400x225/2b3640/white?text=TransparAI',
      likes: 19,
      comments: 5
    },
    {
      id: 3,
      title: 'CreatorFirst',
      team: 'ContentDAO',
      description: 'A creator-first content platform ensuring fair revenue distribution and complete ownership of works.',
      techStack: ['Rust', 'WebAssembly', 'Svelte'],
      submittedAt: '2024-01-15',
      thumbnailUrl: 'https://placehold.co/400x225/2b3640/white?text=CreatorFirst',
      likes: 31,
      comments: 12
    }
  ],
  schedule: [
    {
      id: 1,
      title: 'Registration',
      date: '2025-01-01 - 2025-12-01',
      time: '00:00 UTC - 23:59 UTC',
      description: 'Participants can start registering for the hackathon.',
      status: 'active'
    },
    {
      id: 2,
      title: 'Kickoff Meeting',
      date: '2023-12-05',
      time: '15:00 UTC',
      description: 'Online meeting introducing the hackathon theme, rules, and judging criteria.',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Technical Workshop I',
      date: '2023-12-10',
      time: '14:00 UTC',
      description: 'Blockchain technology basics and smart contract development workshop.',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Technical Workshop II',
      subtitle: 'Frontend Development for Web3 Applications',
      date: '2023-12-15',
      time: '14:00 UTC',
      description: 'Decentralized application architecture and frontend development workshop.',
      status: 'active',
      speaker: {
        name: 'Sarah Johnson',
        position: 'Lead Developer at Ethereum Foundation',
        avatar: 'https://placehold.co/400x400/2b3640/white?text=Sarah+Johnson',
        username: '@SarahWeb3Dev',
        email: "email@example.com"
      }
    },
    {
      id: 5,
      title: 'Mentoring Sessions',
      date: '2024-01-05',
      time: '16:00 UTC',
      description: 'One-on-one discussions with mentors about project progress and challenges.',
      status: 'upcoming'
    },
    {
      id: 6,
      title: 'Project Submission Deadline',
      date: '2024-01-15',
      time: '23:59 UTC',
      description: 'All projects must be submitted by this date.',
      status: 'upcoming'
    },
    {
      id: 7,
      title: 'Judging Period',
      date: '2024-01-16 - 2024-01-20',
      time: 'All day',
      description: 'Judges will review all submitted projects.',
      status: 'upcoming'
    },
    {
      id: 8,
      title: 'Winners Announced',
      date: '2024-01-25',
      time: '18:00 UTC',
      description: 'Online award ceremony, announcing the winning projects.',
      status: 'upcoming'
    }
  ],
  prizes: [
    { 
      id: 1, 
      title: 'Tech Fairness Exploration Awards', 
      winners: 9,
      amount: '18,000 USD',
      description: "This track is open to all topics as long as your work addresses 'tech fairness.' We welcome both builders and storytellers—whether you're coding a protocol, designing a governance interface, or building a meme engine.\nSuggested directions (not limited to):\nAlgorithm transparency and interpretability\nData sovereignty and privacy protection\nSustainable income in the AI era\nCreator-first infrastructure and anti-platform design\nIdentity, reputation and governance frameworks\nDecentralized storytelling and public discourse tools\nHuman-centered AI & Web3 interactions\nJudging criteria include originality, usability, impact, and alignment with the theme of fairness.\nEach selected team will receive 2,000 USD worth of FAIR3 tokens.",
      criteria: [
        { name: 'Originality', description: 'Is the idea novel and imaginative? Does it offer a new take on an old problem?', maxScore: 20 },
        { name: 'Relevance to Tech Fairness', description: 'Does the project address core fairness challenges (algorithm transparency, data sovereignty, sustainable income, etc.)?', maxScore: 25 },
        { name: 'Functionality & Implementation', description: 'How well is the project executed? Is there a working demo or prototype?', maxScore: 20 },
        { name: 'Impact & Usefulness', description: 'Can this project be applied to real communities or users? Is it scalable or integrable?', maxScore: 20 },
        { name: 'Design & Clarity', description: 'Is the presentation intuitive? Is the design and documentation clear enough to be understood and used?', maxScore: 15 }
      ],
      voting: {
        mode: 'Project Scoring',
        judging: 'Judges Only',
        maxVotesPerJudge: 100
      },
      judges: [
        { name: 'Wizzy', handle: '@WizzyOnChain', avatar: 'https://i.pravatar.cc/100?img=1' },
        { name: 'Doodle', handle: '@Doodlegenics', avatar: 'https://i.pravatar.cc/100?img=2' },
        { name: 'lynk', handle: '@lynk0x', avatar: 'https://i.pravatar.cc/100?img=3' }
      ]
    },
    { 
      id: 2, 
      title: 'FAIR3 Public Infrastructure Awards', 
      winners: 3,
      amount: '6,000 USD',
      description: "This track is open to all topics as long as your work addresses 'tech fairness.' We welcome both builders and storytellers—whether you're coding a protocol, designing a governance interface, or building a meme engine.\nSuggested directions (not limited to):\nAlgorithm transparency and interpretability\nData sovereignty and privacy protection\nSustainable income in the AI era\nCreator-first infrastructure and anti-platform design\nIdentity, reputation and governance frameworks\nDecentralized storytelling and public discourse tools\nHuman-centered AI & Web3 interactions\nJudging criteria include originality, usability, impact, and alignment with the theme of fairness.\nEach selected team will receive 2,000 USD worth of FAIR3 tokens.",
      criteria: [
        { name: 'Originality', description: 'Is the idea novel and imaginative? Does it offer a new take on an old problem?', maxScore: 20 },
        { name: 'Relevance to Tech Fairness', description: 'Does the project address core fairness challenges (algorithm transparency, data sovereignty, sustainable income, etc.)?', maxScore: 25 },
        { name: 'Functionality & Implementation', description: 'How well is the project executed? Is there a working demo or prototype?', maxScore: 20 },
        { name: 'Impact & Usefulness', description: 'Can this project be applied to real communities or users? Is it scalable or integrable?', maxScore: 20 },
        { name: 'Design & Clarity', description: 'Is the presentation intuitive? Is the design and documentation clear enough to be understood and used?', maxScore: 15 }
      ],
      voting: {
        mode: 'Project Scoring',
        judging: 'Judges Only',
        maxVotesPerJudge: 100
      },
      judges: [
        { name: 'Wizzy', handle: '@WizzyOnChain', avatar: 'https://i.pravatar.cc/100?img=1' },
        { name: 'Doodle', handle: '@Doodlegenics', avatar: 'https://i.pravatar.cc/100?img=2' },
        { name: 'lynk', handle: '@lynk0x', avatar: 'https://i.pravatar.cc/100?img=3' }
      ]
    }
  ]
};

const HackathonDetailPage = () => {
  const { id, tab = 'overview' } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab);
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 计算并更新倒计时
  useEffect(() => {
    if (!hackathon || !hackathon.registrationEndDate) return;

    // 计算倒计时
    const calculateTimeLeft = () => {
      try {
        const registrationEndTime = new Date(hackathon.registrationEndDate).getTime();
        const now = new Date().getTime();
        const difference = registrationEndTime - now;

        if (difference <= 0 || isNaN(difference)) {
          // 如果已经结束或日期无效，返回全0
          console.log('Registration ended or invalid date');
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        // 计算剩余时间
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        console.log('Time left calculated:', { days, hours, minutes, seconds });
        
        return { days, hours, minutes, seconds };
      } catch (error) {
        console.error('Error calculating timeLeft:', error);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    // 初始计算
    setTimeLeft(calculateTimeLeft());

    // 每秒更新一次
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // 清理定时器
    return () => clearInterval(timer);
  }, [hackathon]);

  // 获取hackathon数据
  useEffect(() => {
    const getHackathonData = async () => {
      setLoading(true);
      try {
        const data = await fetchHackathonById(id);
        if (data) {
          setHackathon(data);
        } else {
          setError("Details of the hackathon cannot be obtained");
        }
      } catch (err) {
        setError("An error occurred while fetching hackathon details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getHackathonData();
  }, [id]);

  // Handle tab change
  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/hackathons/${id}/${newTab}`);
  };

  // 渲染加载状态
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121820]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // 渲染错误状态
  if (error || !hackathon) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121820]">
        <div className="text-white text-xl">{error || "Details of the hackathon cannot be obtained"}</div>
      </div>
    );
  }

  const renderTabContent = () => {
    // 创建包含 timeLeft 的 hackathon 对象
    const hackathonWithTimeLeft = { ...hackathon, timeLeft };
    
    switch (activeTab) {
      case 'overview':
        return <OverviewTab hackathon={hackathonWithTimeLeft} />;
      case 'prizes':
        return <PrizesTab prizes={hackathon.prizes} hackathon={hackathonWithTimeLeft} />;
      case 'schedule':
        return <ScheduleTab hackathon={hackathonWithTimeLeft} />;
      case 'submissions':
        return <SubmissionsTab hackathon={hackathonWithTimeLeft} />;
      default:
        return <OverviewTab hackathon={hackathonWithTimeLeft} />;
    }
  };

  return (
    <HackathonDetailLayout 
      hackathon={{...hackathon, timeLeft}}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {renderTabContent()}
    </HackathonDetailLayout>
  );
};

export default HackathonDetailPage;
