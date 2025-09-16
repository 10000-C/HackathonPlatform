import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectDetailLayout from '../components/ProjectDetail/ProjectDetailLayout';
import OverviewTab from '../components/ProjectDetail/OverviewTab';

// 模拟从API获取项目详情
const fetchProjectById = async (projectId) => {
  try {
    // 这里应该是实际的API调用
    // 暂时使用模拟数据
    const mockProject = {
      id: projectId,
      name: 'Init Club Pro',
      logo: null,
      shortDescription: 'An innovative blockchain-based sports engagement platform',
      fullDescription: 'Dunk Verse is an innovative blockchain-based sports engagement platform designed to revolutionize the fan experience. Leveraging Mantle\'s Layer 2 infrastructure, the platform combines GameFi, SocialFi, and NFT to offer unique features like AI-generated quizzes, live NFT auctions tied to Top Shots NBA sports events, and leaderboard competitions. Fans can upload videos that are automatically minted into NFTs, participate in AI quizzes',
      progressDescription: 'During hackathon, we accomplished following: - Frontend Development: Built a user-friendly interface for NFT auctions, AI quizzes, and Social Interaction. - Smart Contracts: Deployed key smart contracts for the token and Betting Pool on the Mantle Testnet. - AI Quiz Integration: Implemented AIGC DALL-E3 GPT models that generate dynamic quizzes based on live sports events. Developed a functional NFT auction system that allows users to bid using our tokens. - Testing and Deployment: Conducted rigorous testing to ensure seamless operations and deployed the project with all features integrated.',
      fundraisingStatus: 'Not raised any funds, but actively looking to raise.',
      githubLink: 'https://github.com/example/project',
      techStack: ['React', 'Blockchain', 'AI', 'NFT', 'DeFi', 'Test'],
      sectors: ['SocialFi', 'Infra', 'GameFi', 'NFT', 'AI', 'DeFi','Test'],
      hackathonDescription: 'This project was developed during the ChainSpark Hackathon 2024, focusing on innovative blockchain solutions.',
      participationRequirements: 'Team members should have experience with blockchain development and web3 technologies.',
      videoLink: 'https://example.com/demo-video',
      teamLeader: 'Test User',
      hackathonName: 'Test Hackathon'
    };

    return mockProject;
  } catch (error) {
    console.error("Error fetching project details:", error);
    return null;
  }
};

const ProjectDetailPage = () => {
  const { id, tab = 'overview' } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取项目数据
  useEffect(() => {
    const getProjectData = async () => {
      setLoading(true);
      try {
        const data = await fetchProjectById(id);
        if (data) {
          setProject(data);
        } else {
          setError("无法获取项目详情");
        }
      } catch (err) {
        setError("获取项目详情时发生错误");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProjectData();
  }, [id]);

  // Handle tab change
  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/projects/${id}/${newTab}`);
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
  if (error || !project) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121820]">
        <div className="text-white text-xl">{error || "无法获取项目详情"}</div>
      </div>
    );
  }

  return (
    <ProjectDetailLayout 
      project={project}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'overview' && <OverviewTab project={project} />}
    </ProjectDetailLayout>
  );
};

export default ProjectDetailPage;
