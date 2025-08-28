import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarIcon,
  CurrencyDollarIcon,
  TagIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

const ECOSYSTEMS = ['ethereum', 'solana', 'polygon', 'binance'];
const TECH_STACKS = ['web3', 'ai', 'defi', 'nft'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function CreateHackathonForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    startDate: '',
    endDate: '',
    registrationEnd: '',
    prizePool: '',
    level: '',
    ecosystem: '',
    techStack: [],
    requirements: '',
    rules: '',
    judgingCriteria: '',
    maxParticipants: ''
  });
  const [uploading, setUploading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, error: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechStackChange = (tech) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // TODO: 实现文件上传逻辑
      const formData = new FormData();
      formData.append('logo', file);
      
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData
      // });
      // const { url } = await response.json();
      
      setFormData(prev => ({ ...prev, logo: 'url' }));
    } catch (error) {
      console.error('Error uploading logo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: null });

    try {
      // TODO: 实现表单提交逻辑
      // const response = await fetch('/api/hackathons', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) throw new Error('Failed to create hackathon');
      
      // const data = await response.json();
      navigate('/hackathons');
    } catch (error) {
      setSubmitStatus({ loading: false, error: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* 基本信息 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Basic Information</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hackathon Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Logo
              </label>
              <div className="mt-1 flex items-center gap-4">
                {formData.logo ? (
                  <img
                    src={formData.logo}
                    alt="Hackathon logo"
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <PhotoIcon className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={uploading}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0066cc]/10 file:text-[#0066cc] hover:file:bg-[#0066cc]/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 时间和奖金 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Schedule & Prize</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div className="mt-1 relative">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                  required
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <div className="mt-1 relative">
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                  required
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Registration End Date
              </label>
              <div className="mt-1 relative">
                <input
                  type="date"
                  name="registrationEnd"
                  value={formData.registrationEnd}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                  required
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prize Pool (USD)
              </label>
              <div className="mt-1 relative">
                <input
                  type="number"
                  name="prizePool"
                  value={formData.prizePool}
                  onChange={handleInputChange}
                  min="0"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 pl-8 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                  required
                />
                <CurrencyDollarIcon className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* 分类和标签 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Categories & Tags</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ecosystem
              </label>
              <select
                name="ecosystem"
                value={formData.ecosystem}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                required
              >
                <option value="">Select an ecosystem</option>
                {ECOSYSTEMS.map(eco => (
                  <option key={eco} value={eco}>
                    {eco.charAt(0).toUpperCase() + eco.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tech Stack
              </label>
              <div className="flex flex-wrap gap-2">
                {TECH_STACKS.map(tech => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => handleTechStackChange(tech)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      formData.techStack.includes(tech)
                        ? 'bg-[#0066cc] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <TagIcon className="h-4 w-4 mr-1" />
                    {tech.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                required
              >
                <option value="">Select difficulty level</option>
                {LEVELS.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 详细信息 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Additional Details</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Requirements
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rules
              </label>
              <textarea
                name="rules"
                value={formData.rules}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Judging Criteria
              </label>
              <textarea
                name="judgingCriteria"
                value={formData.judgingCriteria}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Maximum Participants
              </label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleInputChange}
                min="1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="mt-8 flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate('/hackathons')}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitStatus.loading}
          className={`px-6 py-2 bg-[#0066cc] text-white rounded-lg hover:bg-[#0066cc]/90 transition-colors ${
            submitStatus.loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitStatus.loading ? 'Creating...' : 'Create Hackathon'}
        </button>
      </div>

      {submitStatus.error && (
        <div className="mt-4 text-red-600 text-sm">
          {submitStatus.error}
        </div>
      )}
    </form>
  );
}
