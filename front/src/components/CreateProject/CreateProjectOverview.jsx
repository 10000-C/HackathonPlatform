import { useState, useRef, useEffect } from 'react';
import { Upload, Plus, X, Users, Link, Image } from 'lucide-react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import MDEditor from '@uiw/react-md-editor';
import getActivities from '../../utils/getActivities';

export default function CreateProjectOverview({ formData, updateFormData, activityId }) {
  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);
  
  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  // 获取所有可用的sector选项
  const fetchSectors = async () => {
    try {
      const activities = await getActivities(activityId, "activityId");
      const activity = activities.activities[0];
      const url = `https://gold-rational-monkey-593.mypinata.cloud/ipfs/${activity.activity_dataCID}`;
      const request = await fetch(url);
      const response = await request.json();
      const hackathonData = response;
      
      // 从 prizeCorhots 中提取 name 作为 sectors
      const sectors = hackathonData.prizeCorhots.map((cohort, index) => ({
        id: cohort.id.toString(),
        name: cohort.name
      }));
      
      updateFormData({ availableSectors: sectors });
    } catch (error) {
      console.error('Error fetching sectors:', error);
      // 发生错误时设置为空数组
      updateFormData({ availableSectors: [] });
    }
  };

  // 组件加载时获取sector数据
  useEffect(() => {
    fetchSectors();
  }, []);

  // 确保formData中总是有socialLinks
  useEffect(() => {
    if (!formData.socialLinks || formData.socialLinks.length === 0) {
      updateFormData({ socialLinks: [{ domain: '.com', url: '' }] });
    }
  }, [formData.socialLinks, updateFormData]);

  // 在组件卸载时清理预览URL
  useEffect(() => {
    return () => {
      if (formData.banner?.previewUrl) {
        URL.revokeObjectURL(formData.banner.previewUrl);
      }
      if (formData.logo?.previewUrl) {
        URL.revokeObjectURL(formData.logo.previewUrl);
      }
    };
  }, [formData.banner?.previewUrl, formData.logo?.previewUrl]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(name, value);
  };

  const handleBannerClick = () => {
    fileInputRef.current.click();
  };

  const handleLogoClick = () => {
    logoInputRef.current.click();
  };

  const handleFileChange = (e, type) => {
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

      // 创建临时URL以供预览
      const previewUrl = URL.createObjectURL(file);
      
      // 保存文件对象和预览URL
      handleInputChange(type, {
        file: file,
        previewUrl: previewUrl
      });
    }
  };

  // 为 MDEditor 添加默认值，防止 undefined 导致的错误
  const editorValue = formData.fullDescription || '';

  return (
    <div className="p-6">
      <form className="max-w-3xl space-y-6">
        {/* 项目Logo */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white mb-2">Project Logo</label>
          <div 
            className="bg-[#0F1011] border border-dashed border-[#242425] rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#0092ff] transition-all h-[160px] w-[160px]"
            onClick={handleLogoClick}
          >
            {formData.logo?.previewUrl ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={formData.logo.previewUrl} 
                  alt="Logo preview" 
                  className="max-h-[120px] max-w-[120px] object-contain"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputChange('logo', null);
                  }}
                  className="absolute top-0 right-0 bg-black/70 p-1 rounded-full hover:bg-black"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image className="text-[#738B9F] w-6 h-6 mb-2" />
                <p className="text-[#738B9F] text-center text-sm mb-1">Drag'n'drop project<br />logo here or:</p>
                <p className="text-[#0092ff] text-sm font-semibold mt-1">Click to browse</p>
              </div>
            )}
            <input
              type="file"
              ref={logoInputRef}
              onChange={(e) => handleFileChange(e, 'logo')}
              accept="image/jpeg, image/png, image/gif, image/webp"
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-white">
            Project Name
          </label>
          <input
            type="text"
            id="title"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0F1011] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff]"
            placeholder="Enter project name"
          />
        </div>

        {/* 项目简介 */}
        <div className="space-y-2">
          <label htmlFor="intro" className="block text-sm font-medium text-white">
            Project Intro
          </label>
          <textarea
            id="intro"
            name="shortDescription"
            value={formData.shortDescription || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-[#0F1011] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff]"
            placeholder="Short project intro"
          />
        </div>

    
        {/* 行业分类 */}
        <div className="space-y-2">
          <label htmlFor="sector" className="block text-sm font-medium text-white mb-2">Sector</label>
          <select
            id="sector"
            name="sectors"
            value={formData.sectors || ''}
            onChange={(e) => {
              const value = e.target.value;
              handleInputChange('sectors', value ? [value] : []);
            }}
            className="w-full bg-[#0F1011] text-white px-4 py-3 rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff]"
          >
            <option value="">Select sector</option>
            {formData.availableSectors?.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.name}
              </option>
            ))}
          </select>
        </div>

        {/* 黑客松进展 */}
        <div className="space-y-2">
          <label htmlFor="progress" className="block text-sm font-medium text-white">
            Progress During Hackathon
          </label>
          <textarea
            id="progress"
            name="progressDescription"
            value={formData.progressDescription || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-[#0F1011] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff]"
            placeholder="Describe what you have accomplished during the hackathon"
          />
        </div>

        {/* 融资状态 */}
        <div className="space-y-2">
          <label htmlFor="fundraising" className="block text-sm font-medium text-white">
            Fundraising Status
          </label>
          <textarea
            id="fundraising"
            name="fundraisingStatus"
            value={formData.fundraisingStatus || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-[#0F1011] text-white rounded-lg border border-solid border-[#242425] focus:outline-none focus:border-[#0092ff]"
            placeholder="Have you raised any money already? How much do you need to finish the product? Etc."
          />
        </div>

        {/* 完整描述 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white mb-2">Full Description</label>
          <div data-color-mode="dark">
            <MDEditor
              value={editorValue}
              onChange={(value) => handleInputChange('fullDescription', value)}
              preview="edit"
              height={320}
              className="bg-[#0F1011] border border-solid border-[#242425] rounded-lg overflow-hidden"
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