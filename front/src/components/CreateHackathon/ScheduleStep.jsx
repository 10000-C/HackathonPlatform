import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ScheduleStep = ({ formData, updateFormData }) => {
    const [timeSlots, setTimeSlots] = useState(formData.timeSlots || [{
        title: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        description: '',
        location: '',
        speaker: '',
        notes: '',
        showDetails: false
    }]);

    const handleTimeSlotChange = (index, field, value) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index] = { ...newTimeSlots[index], [field]: value };
        setTimeSlots(newTimeSlots);
        updateFormData({ timeSlots: newTimeSlots });
    };

    const handleAddTimeSlot = () => {
        setTimeSlots([...timeSlots, {
            title: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            description: '',
            location: '',
            speaker: '',
            notes: '',
            showDetails: false
        }]);
    };

    const toggleDetails = (index) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index] = { ...newTimeSlots[index], showDetails: !newTimeSlots[index].showDetails };
        setTimeSlots(newTimeSlots);
    };

    const handleDeleteTimeSlot = (index) => {
        const newTimeSlots = timeSlots.filter((_, i) => i !== index);
        setTimeSlots(newTimeSlots);
        updateFormData({ timeSlots: newTimeSlots });
    };

    return (
        <div className="p-6">
            {timeSlots.map((slot, index) => (
                <div key={index} className="mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 pr-4">
                            <label className="block text-white mb-2">Title</label>
                            <input 
                                type="text"
                                value={slot.title}
                                onChange={(e) => handleTimeSlotChange(index, 'title', e.target.value)}
                                className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                                placeholder="Enter event title"
                            />
                        </div>
                        { (
                            <button 
                                onClick={() => handleDeleteTimeSlot(index)}
                                className="text-red-400 hover:text-red-300 mt-8"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-white mb-2">Start Time</label>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="date"
                                    value={slot.startDate}
                                    onChange={(e) => handleTimeSlotChange(index, 'startDate', e.target.value)}
                                    className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                                />
                                <input
                                    type="time"
                                    value={slot.startTime}
                                    onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                                    className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-white mb-2">End Time</label>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="date"
                                    value={slot.endDate}
                                    onChange={(e) => handleTimeSlotChange(index, 'endDate', e.target.value)}
                                    className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                                />
                                <input
                                    type="time"
                                    value={slot.endTime}
                                    onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
                                    className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-700 pb-4">
                        <button 
                            className="text-blue-400 hover:text-blue-300 flex items-center"
                            onClick={() => toggleDetails(index)}
                        >
                            <ChevronDown className={`mr-1 transform ${slot.showDetails ? 'rotate-180' : ''} transition-transform duration-200`} />
                            details
                        </button>
                        
                        {slot.showDetails && (
                            <div className="mt-4 space-y-4 animate-fadeIn">
                                <div>
                                    <label className="block text-white mb-2">Description</label>
                                    <textarea
                                        value={slot.description || ''}
                                        onChange={(e) => handleTimeSlotChange(index, 'description', e.target.value)}
                                        placeholder="Enter event description"
                                        rows={4}
                                        className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={slot.location || ''}
                                        onChange={(e) => handleTimeSlotChange(index, 'location', e.target.value)}
                                        placeholder="Enter event location"
                                        className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white mb-2">Speaker</label>
                                    <input
                                        type="text"
                                        value={slot.speaker || ''}
                                        onChange={(e) => handleTimeSlotChange(index, 'speaker', e.target.value)}
                                        placeholder="Enter speaker name"
                                        className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white mb-2">Additional Notes</label>
                                    <textarea
                                        value={slot.notes || ''}
                                        onChange={(e) => handleTimeSlotChange(index, 'notes', e.target.value)}
                                        placeholder="Enter any additional notes"
                                        rows={3}
                                        className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <button 
                className="text-blue-400 hover:text-blue-300 text-sm mt-6"
                onClick={handleAddTimeSlot}
            >
                + add another time slot
            </button>
        </div>
    );
};

export default ScheduleStep;