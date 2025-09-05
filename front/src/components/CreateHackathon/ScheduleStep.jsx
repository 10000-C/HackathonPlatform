import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const ScheduleStep = () => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-white text-lg mb-2">Jun 17, 2025 19:00 - Jul 19, 2025 19:00</h2>
                <div className="border-b border-gray-700 pb-4">
                    <h3 className="text-white font-medium mb-4">June 21, 2025 16:00</h3>
                    <button className="text-blue-400 hover:text-blue-300 flex items-center">
                        <span className="mr-1">◢</span> details
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-white mb-2">Hackathon Name</label>
                    <input
                        type="text"
                        placeholder="Enter hackathon name"
                        className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-white mb-2">Short Description</label>
                    <textarea
                        placeholder="Short description that goes under key visual"
                        className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none h-32"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="include-speaker"
                        className="w-4 h-4 text-blue-600 bg-[#0f1011] border-gray-600 rounded focus:ring-blue-500"
                        defaultChecked
                    />
                    <label htmlFor="include-speaker" className="text-white">Include Speaker</label>
                </div>

                <div>
                    <label className="block text-white mb-2">Speaker Picture</label>
                    <div className="bg-[#0f1011] border border-solid border-[#242425] rounded p-4 w-24 h-24 flex flex-col items-center justify-center">
                        <Upload className="text-gray-500 w-6 h-6 mb-1" />
                        <p className="text-gray-500 text-xs mb-1">Drag/drop a project</p>
                        <p className="text-gray-500 text-xs mb-1">logo here or</p>
                        <button className="text-blue-400 text-xs hover:text-blue-300">Click to browse</button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-white mb-2">Speaker x.com name</label>
                        <input
                            type="text"
                            placeholder="Enter speaker x.com name"
                            className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2">Speaker x.com link</label>
                        <input
                            type="text"
                            placeholder="Enter speaker x.com link"
                            className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-white mb-2">Speaker real name</label>
                        <input
                            type="text"
                            placeholder="Enter speaker real name"
                            className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2">Speaker work place & position</label>
                        <input
                            type="text"
                            placeholder="Enter speaker details"
                            className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <button className="text-blue-400 hover:text-blue-300 text-sm mt-6">
                + add another time slot
            </button>
        </div>

    );
};
export default ScheduleStep;