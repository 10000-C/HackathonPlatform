import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectDetailLayout from '../components/ProjectDetail/ProjectDetailLayout';
import OverviewTab from '../components/ProjectDetail/OverviewTab';
import getDemos from '../utils/GetDemos';

// 模拟从API获取项目详情


const ProjectDetailPage = () => {
  const { activityId, projectId, tab = 'overview' } = useParams();
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
        console.log("Fetching project data for activityId:", activityId, "projectId:", projectId);
        const demos = await getDemos(activityId, projectId, "Both");
        const dataCID = demos.demos[0].demo_dataCID;
        const url = `https://gold-rational-monkey-593.mypinata.cloud/ipfs/${dataCID}`
        const request = await fetch(url);
        const data = await request.json();
        console.log("pinata response data", data);
        
        // 处理项目数据
        if (data) {
          // 处理 logo
          const processedData = {
            ...data,
            // 如果有 logo 且是 IPFS CID，转换为完整的 IPFS URL
            logo: data.logo ? 
              data.logo.startsWith('http') ? 
                data.logo : 
                `https://gold-rational-monkey-593.mypinata.cloud/ipfs/${data.logo}` :
              null
          };
          setProject(processedData);
        } else {
          setError("Project details not found");
        }
      } catch (err) {
        setError("Error fetching project details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProjectData();
  }, [activityId, projectId]);

  // Handle tab change
  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/hackathons/${activityId}/projects/${projectId}/${newTab}`);
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
