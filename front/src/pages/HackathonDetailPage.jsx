import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HackathonDetailLayout from '../components/HackathonDetail/HackathonDetailLayout';
import OverviewTab from '../components/HackathonDetail/OverviewTab';
import PrizesTab from '../components/HackathonDetail/PrizesTab';
import ScheduleTab from '../components/HackathonDetail/ScheduleTab';
import SubmissionsTab from '../components/HackathonDetail/SubmissionsTab';
import callSearchService from '../utils/CallSearchService';

// 从IPFS获取黑客松详情
const fetchHackathonById = async (hackathonId) => {
  try {
    // 构建IPFS URL
    const dataFromGraph = await callSearchService(hackathonId, "activityId");
    console.log("GraphQL response:", dataFromGraph);
    
    const activityData = dataFromGraph.activities[0];
    if (!activityData || !activityData.activity_dataCID) {
      throw new Error('No data CID found for the hackathon');
    }

    const dataCID = activityData.activity_dataCID;
    const url = `https://gold-rational-monkey-593.mypinata.cloud/ipfs/${dataCID}`;
    let response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch hackathon data');
    }
    
    const data = await response.json();
    console.log("pinata response",data);
    // 转换数据格式
    let techStack = [];
    if (Array.isArray(data.techStack)) {
      techStack = data.techStack;
    } else if (typeof data.techStack === 'string') {
      techStack = data.techStack.split(',').map(item => item.trim()).filter(item => item);
    }

    // 构造links对象
    const links = {};
    if (data.socialLinks && Array.isArray(data.socialLinks)) {
      data.socialLinks.forEach(link => {
        const domain = link.domain.toLowerCase();
        if (domain.includes('twitter') || domain.includes('x.com')) {
          links.twitter = link.url;
        } else if (domain.includes('discord')) {
          links.discord = link.url;
        }
      });
    }

    // 格式化日期
    const formatDate = (dateStr) => {
      if (!dateStr) return null;
      try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return null;
        return date.toISOString().split('T')[0];
      } catch (e) {
        console.error('Date formatting error:', e);
        return null;
      }
    };

    return {
      id: hackathonId,
      title: data.name,
      description: data.fullDescription || data.shortDescription,
      startDate: formatDate(data.hackathonStart),
      endDate: formatDate(data.hackathonEnd),
      registrationStart: formatDate(data.registrationStart),
      registrationEnd: formatDate(data.registrationEnd),
      votingStart: formatDate(data.votingStart),
      votingEnd: formatDate(data.votingEnd),
      prizePool: `${data.prizePool || 0} USD`,
      location: data.location || 'Online',
      level: data.experienceLevel || 'All Levels',
      techStack: techStack.length > 0 ? techStack.join(', ') : 'All Tech Stacks',
      status: 'active', // 根据日期计算状态
      bannerImage: data.banner ? `https://gold-rational-monkey-593.mypinata.cloud/ipfs/${data.banner}` : 'https://placehold.co/1600x400/121820/0092ff?text=Hackathon',
      links: links.twitter || links.discord ? links : { twitter: '#', discord: '#' },
      schedule: data.schedule || [],
      prizes: data.prizeCorhots?.map(cohort => ({
        id: cohort.id,
        title: cohort.name,
        winners: parseInt(cohort.numberOfWinners) || 0,
        amount: `${cohort.prizeAmount || 0} USD`,
        description: cohort.description || '',
        criteria: cohort.evaluationCriteria?.map(criteria => ({
          name: criteria.name,
          description: criteria.description,
          points: parseInt(criteria.points) || 0
        })) || []
      })) || [],
      quests: [] // 添加空的任务列表
    };
  } catch (error) {
    console.error("Error fetching hackathon details:", error);
    return null;
  }
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
    if (!hackathon || !hackathon.registrationEnd) return;

    // 计算倒计时
    const calculateTimeLeft = () => {
      try {
        const registrationEndTime = new Date(hackathon.registrationEnd).getTime();
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
        
        //console.log('Time left calculated:', { days, hours, minutes, seconds });
        
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
