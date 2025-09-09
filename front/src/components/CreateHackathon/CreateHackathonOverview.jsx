import { useState, useRef, useEffect } from 'react';
import { Upload, Plus, X, Users, Link } from 'lucide-react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import MDEditor from '@uiw/react-md-editor';

export default function CreateHackathonForm({ formData, updateFormData }) {
  const fileInputRef = useRef(null);
  
  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  // 确保formData中总是有socialLinks
  useEffect(() => {
    if (!formData.socialLinks || formData.socialLinks.length === 0) {
      updateFormData({ socialLinks: [{ domain: '.com', url: '' }] });
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(name, value);
  };

  const handleBannerClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 检查文件类型
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const allowedExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
      
      if (!allowedTypes.includes(file.type) && !allowedExtensions.test(file.name)) {
        alert('请上传有效的图片文件 (jpg, jpeg, png, gif, webp)');
        return;
      }
      
      // 检查文件大小 (限制为5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('文件大小不能超过5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        // 将图片数据保存到formData中
        handleInputChange('banner', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <form className="max-w-3xl space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-white">
            Hackathon Name
          </label>
          <input
            type="text"
            id="title"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#0f1011] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff]"
            placeholder="Enter hackathon name"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-white mb-2">Hackathon Banner</label>
          <div 
            className="bg-[#0f1011] border border-solid border-[#242425] rounded px-4 py-20 min-h-32 flex flex-col items-center justify-center cursor-pointer hover:border-[#0092ff]"
            onClick={handleBannerClick}
          >
            {formData.banner ? (
              <img 
                src={formData.banner} 
                alt="Banner preview" 
                className="max-h-40 rounded"
              />
            ) : (
              <>
                <Upload className="text-gray-500 w-8 h-8 mb-2" />
                <p className="text-gray-400 text-sm mb-1">Click to select a graph</p>
                <p className="text-gray-500 text-xs mb-2">Supports: JPG, PNG, GIF, WEBP (Max 5MB)</p>
                <button 
                  type="button"
                  className="text-blue-400 text-sm hover:text-blue-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBannerClick();
                  }}
                >
                  Click to browse
                </button>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg, image/png, image/gif, image/webp"
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-white">
            Short Description
          </label>
          <textarea
            id="description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={4}
            className="w-full h-24 px-3 py-2 bg-[#0f1011] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff]"
            placeholder="Short description that goes under key visual"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Registration duration</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <input
                  type="date"
                  name="registrationStart"
                  value={formData.registrationStart}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#0f1011] text-white rounded-lg border border-[#242425] focus:border-[#0092ff] focus:outline-none focus:ring-1 focus:ring-[#0092ff]"
                  required
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="relative">
                <input
                  type="date"
                  name="registrationEnd"
                  value={formData.registrationEnd}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#0f1011] text-white rounded-lg border border-[#242425] focus:border-[#0092ff] focus:outline-none focus:ring-1 focus:ring-[#0092ff]"
                  required
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Hackathon duration</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <input
                  type="date"
                  name="hackathonStart"
                  value={formData.hackathonStart}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#0f1011] text-white rounded-lg border border-[#242425] focus:border-[#0092ff] focus:outline-none focus:ring-1 focus:ring-[#0092ff]"
                  required
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="relative">
                <input
                  type="date"
                  name="hackathonEnd"
                  value={formData.hackathonEnd}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#0f1011] text-white rounded-lg border border-[#242425] focus:border-[#0092ff] focus:outline-none focus:ring-1 focus:ring-[#0092ff]"
                  required
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Voting duration</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <input
                  type="date"
                  name="votingStart"
                  value={formData.votingStart}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#0f1011] text-white rounded-lg border border-[#242425] focus:border-[#0092ff] focus:outline-none focus:ring-1 focus:ring-[#0092ff]"
                  required
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="relative">
                <input
                  type="date"
                  name="votingEnd"
                  value={formData.votingEnd}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#0f1011] text-white rounded-lg border border-[#242425] focus:border-[#0092ff] focus:outline-none focus:ring-1 focus:ring-[#0092ff]"
                  required
                />
                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white mb-2">Tech stack</label>
          <select 
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none">
            <option value="">Select tech stack</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="react">React</option>
          </select>
        </div>
        <div>
          <label className="block text-white mb-2">Experience Level</label>
          <select 
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none">
            <option value="">Select experience level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-white mb-2">Hackathon location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter hackathon location"
          className="w-full bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-white mb-2">Social links</label>
        {formData.socialLinks?.map((link, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <select 
              className="bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
              value={link.domain}
              onChange={(e) => {
                const newLinks = [...formData.socialLinks];
                newLinks[index].domain = e.target.value;
                updateFormData({ socialLinks: newLinks });
              }}
            >
              <option>.com</option>
              <option>.org</option>
              <option>.net</option>
            </select>
            <input
              type="text"
              placeholder="Enter link to x.com"
              value={link.url}
              onChange={(e) => {
                const newLinks = [...formData.socialLinks];
                newLinks[index].url = e.target.value;
                updateFormData({ socialLinks: newLinks });
              }}
              className="flex-1 bg-[#0f1011] text-white p-3 rounded border border-solid border-[#242425] focus:border-blue-500 focus:outline-none"
            />
            {index > 0 && (
              <button
                onClick={() => {
                  const newLinks = formData.socialLinks.filter((_, i) => i !== index);
                  updateFormData({ socialLinks: newLinks });
                }}
                className="p-3 text-red-400 hover:text-red-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <button 
          type="button"
          onClick={() => {
            const newLinks = [...(formData.socialLinks || []), { domain: '.com', url: '' }];
            updateFormData({ socialLinks: newLinks });
          }}
          className="text-blue-400 text-sm mt-2 hover:text-blue-300"
        >
          + add another link
        </button>
      </div>

      <div>
        <label className="block text-white mb-2">Full Description</label>
        <div data-color-mode="dark">
          <MDEditor
            value={formData.fullDescription}
            onChange={(value) => handleInputChange('fullDescription', value)}
            preview="edit"
            height={320}
            className="bg-[#0f1011] border border-solid border-[#242425] rounded overflow-hidden"
            textareaProps={{
              placeholder: "Enter full description in Markdown format..."
            }}
          />
        </div>
      </div>
      </form>
    </div>
  );
}