import { useState } from 'react';
import { CalendarIcon, PlusCircle, Trash } from 'lucide-react';

const HackathonStep = ({ formData, updateFormData }) => {
  const [newReward, setNewReward] = useState({ title: '', amount: '', description: '' });
  const [showRewardForm, setShowRewardForm] = useState(false);

  const handleAddReward = () => {
    if (newReward.title && newReward.amount) {
      updateFormData({
        rewards: [...(formData.rewards || []), newReward]
      });
      setNewReward({ title: '', amount: '', description: '' });
      setShowRewardForm(false);
    }
  };

  const handleRemoveReward = (index) => {
    const updatedRewards = [...formData.rewards];
    updatedRewards.splice(index, 1);
    updateFormData({ rewards: updatedRewards });
  };

  const handleDateChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="p-8 bg-[#0A0B0C]">
      <h1 className="text-2xl font-bold text-white mb-6">Hackathon Details</h1>
      <div className="max-w-4xl space-y-8">
        {/* 黑客松时间段 */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-white">Hackathon Schedule</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-300">Start Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.startDate || ''}
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0F1011] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff] pl-10"
                />
                <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-300">End Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.endDate || ''}
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0F1011] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff] pl-10"
                />
                <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* 奖励设置 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-white">Rewards & Prizes</h2>
            <button
              onClick={() => setShowRewardForm(true)}
              className="flex items-center text-[#0092ff] hover:text-[#3aabff]"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              <span>Add Reward</span>
            </button>
          </div>

          {/* 现有奖励列表 */}
          {formData.rewards && formData.rewards.length > 0 ? (
            <div className="space-y-3">
              {formData.rewards.map((reward, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center p-4 bg-[#0F1011] rounded-lg border border-solid border-[#242425]"
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-white font-medium">{reward.title}</span>
                      <span className="ml-3 text-[#0092ff] font-medium">${reward.amount}</span>
                    </div>
                    {reward.description && (
                      <p className="text-gray-400 text-sm mt-1">{reward.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveReward(index)}
                    className="text-gray-400 hover:text-red-500 ml-4"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 bg-[#0F1011] rounded-lg border border-dashed border-[#242425]">
              No rewards added yet
            </div>
          )}

          {/* 添加奖励表单 */}
          {showRewardForm && (
            <div className="p-4 bg-[#0F1011] rounded-lg border border-solid border-[#242425]">
              <h3 className="text-white font-medium mb-3">Add New Reward</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="Reward Title (e.g. First Place)"
                    value={newReward.title}
                    onChange={(e) => setNewReward({...newReward, title: e.target.value})}
                    className="w-full px-4 py-3 bg-[#191A1C] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Amount (e.g. 1000)"
                    value={newReward.amount}
                    onChange={(e) => setNewReward({...newReward, amount: e.target.value})}
                    className="w-full px-4 py-3 bg-[#191A1C] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff]"
                  />
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Description (optional)"
                  value={newReward.description}
                  onChange={(e) => setNewReward({...newReward, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#191A1C] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff]"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowRewardForm(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddReward}
                  className="px-4 py-2 bg-[#0092ff] text-white rounded-lg hover:bg-[#3aabff]"
                  disabled={!newReward.title || !newReward.amount}
                >
                  Add Reward
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 黑客松描述 */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-white">Hackathon Description</h2>
          <textarea
            placeholder="Describe your hackathon, its goals, and what participants can expect..."
            value={formData.hackathonDescription || ''}
            onChange={(e) => updateFormData({ hackathonDescription: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 bg-[#0F1011] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff]"
          />
        </div>

        {/* 参与条件 */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-white">Participation Requirements</h2>
          <textarea
            placeholder="Specify any requirements for participants (e.g., skills, team size, etc.)..."
            value={formData.participationRequirements || ''}
            onChange={(e) => updateFormData({ participationRequirements: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-[#0F1011] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff]"
          />
        </div>
      </div>
    </div>
  );
};

export default HackathonStep;