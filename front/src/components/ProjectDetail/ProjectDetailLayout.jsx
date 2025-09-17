import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProjectDetailLayout = ({ project, activeTab, onTabChange, children }) => {
    const navigate = useNavigate();
    const { activityId } = useParams();
    const [isScrolled, setIsScrolled] = useState(false);

    // 确保 activityId 存在


    // Handle scroll event to show/hide fixed header
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 150);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div className="bg-[#1b1b1e] min-h-screen pb-12 px-20">
            {/* Fixed header on scroll */}
            <div className={`fixed top-0 left-0 w-full bg-[#1b1b1e] shadow-md z-50 transition-transform duration-300 ${isScrolled ? 'translate-y-0' : '-translate-y-full'
                }`}>
                <div className="container mx-auto px-6 py-3">
                    {/* Top Navigation Row */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                            <button 
                                onClick={() => navigate(`/hackathons/${activityId}/submissions`)}
                                className="flex items-center text-white/60 hover:text-white mr-6"
                            >
                                <div className="w-4 h-4 mr-2 border border-[#949FA8] rounded p-0.5">
                                    <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.75 9L5.25 9" stroke="#949FA8" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9 12.75L5.25 9L9 5.25" stroke="#949FA8" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <span className="text-sm font-normal">Back to {project?.hackathonName || 'Hackathon'} Projects</span>
                            </button>
                        </div>
                    </div>

                    <h2 className="text-lg font-semibold text-white hidden sm:block mb-4">{project?.name}</h2>

                    {/* Tabs Row */}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full">
                {/* Header Section */}
                <div className="container mx-auto px-6">
                    {/* Back button */}
                    <div className="py-4 flex justify-between">
                        <div className="flex items-center">
                            <button 
                                onClick={() => navigate(`/hackathons/${activityId}/submissions`)}
                                className="flex items-center text-white/60 hover:text-white"
                            >
                                <div className="w-4 h-4 mr-2 border border-[#949FA8] rounded p-0.5">
                                    <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.75 9L5.25 9" stroke="#949FA8" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9 12.75L5.25 9L9 5.25" stroke="#949FA8" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <span className="text-sm font-normal">Back to {project?.hackathonName || 'Hackathon'} Projects</span>
                            </button>
                        </div>
                    </div>

                    {/* Project Name */}
                    {/* <div className="mb-6">
                        <h1 className="text-[32px] font-semibold text-white leading-none">{project?.name}</h1>
                    </div> */}

                    {/* Tab Navigation */}

                    {/* Content Area */}
                    <div className="mt-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailLayout;
