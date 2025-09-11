import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HackathonSidebar from './HackathonSidebar';
import HackathonBanner from './HackathonBanner';

const HackathonDetailLayout = ({ hackathon, activeTab, onTabChange, children }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll event to show/hide fixed header
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 150);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'prizes', label: 'Prize & Judge' },
        { id: 'schedule', label: 'Schedule' },
        { id: 'submissions', label: 'Submitted Projects' }
    ];

    return (
        <div className="bg-[#1b1b1e] min-h-screen pb-12 px-20">
            {/* Fixed header on scroll */}
            <div className={`fixed top-0 left-0 w-full bg-[#1b1b1e] shadow-md z-50 transition-transform duration-300 ${isScrolled ? 'translate-y-0' : '-translate-y-full'
                }`}>
                <div className="container mx-auto px-6 py-3">
                    {/* Top Navigation Row */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                            <Link to="/hackathons" className="flex items-center text-white mr-6">
                                <div className="w-4 h-4 mr-2">
                                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5.25L5.25 9L9 12.75" stroke="#949FA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5.25 9H12.75" stroke="#949FA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span className="text-xs font-normal">Back to Hackathons</span>
                            </Link>

                            <h2 className="text-lg font-semibold text-white hidden sm:block">{hackathon.title}</h2>
                        </div>

                        <div className="flex items-center">
                            <button className="flex items-center bg-transparent border border-[#2b3740] rounded-md px-2 py-1.5 text-white">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                    <path d="M10 1.33337H4C3.26667 1.33337 2.66667 1.93337 2.66667 2.66671V10.6667" stroke="#0092FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 6.00004H4" stroke="#0092FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 10.6667H4" stroke="#0092FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.73333 9.00671L5.73333 4.33337" stroke="#0092FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.73333 4.33337L10 4.33337" stroke="#0092FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-xs">Submit Project</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs Row */}
                    <div className="bg-[#ffffff]/10 rounded-lg w-fit">
                        <div className="relative flex items-center h-[42px]">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`px-4 py-2 text-white text-xs ${activeTab === tab.id ? 'bg-[#0092ff] rounded-lg z-10' : ''
                                        }`}
                                    onClick={() => onTabChange(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area with proper stacking */}
            <div className="w-full">
                {/* Header Section */}
                <div className="container mx-auto px-6">
                    {/* Back to hackathons */}
                    <div className="py-4 flex justify-between">
                        <div className="flex items-center">
                            <Link to="/hackathons" className="flex items-center text-white">
                                <div className="w-4 h-4 mr-2">
                                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5.25L5.25 9L9 12.75" stroke="#949FA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5.25 9H12.75" stroke="#949FA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span className="text-xs font-normal">Back to Hackathons</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <button className="flex items-center bg-transparent border border-[#2b3740] rounded-md px-2 py-1.5 text-white">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                                    <path d="M10 1.33337H4C3.26667 1.33337 2.66667 1.93337 2.66667 2.66671V10.6667" stroke="#0092FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 6.00004H4" stroke="#0092FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 10.6667H4" stroke="#0092FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.73333 9.00671L5.73333 4.33337" stroke="#0092FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.73333 4.33337L10 4.33337" stroke="#0092FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-xs">Submit Project</span>
                            </button>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="">
                        <div className="bg-[#ffffff]/10 rounded-lg w-fit">
                            <div className="relative flex items-center h-[48px]">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={tab.id}
                                        className={`px-6 py-3 text-white text-sm h-full ${activeTab === tab.id ? 'bg-[#0092ff] rounded-lg z-10' : ''
                                            }`}
                                        onClick={() => onTabChange(tab.id)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Hackathon Title */}
                    <div>
                        <h1 className="text-2xl font-semibold text-white mt-6">{hackathon.title}</h1>
                    </div>

                    {/* Banner - Only displayed in Overview tab */}
                    {activeTab === 'overview' && (
                        <div className="mt-6">
                            <HackathonBanner hackathon={hackathon} />
                        </div>
                    )}

                    {/* Content Area */}
                    <div className="mt-6">
                        {/* Only pass children (content) to be rendered by the layout */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HackathonDetailLayout;
