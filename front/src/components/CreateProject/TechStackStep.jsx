import { useState } from 'react';
import { Plus, X, Upload, Link } from 'lucide-react';

// 技术栈数据 - 扩展技术栈选项，与Figma设计保持一致
const techStackOptions = [
  { id: 'react', name: 'React', icon: '⚛️' },
  { id: 'next', name: 'Next', icon: '▲' },
  { id: 'vue', name: 'Vue', icon: '🟢' },
  { id: 'web3', name: 'Web3', icon: '�' },
  { id: 'ethers', name: 'Ethers', icon: '�' },
  { id: 'node', name: 'Node', icon: '�' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'golang', name: 'Go', icon: '🔵' },
  { id: 'python', name: 'Python', icon: '�' },
  { id: 'solidity', name: 'Solidity', icon: '💎' },
  { id: 'rust', name: 'Rust', icon: '⚙️' },
  { id: 'move', name: 'Move', icon: '�' },
  { id: 'typescript', name: 'TypeScript', icon: '�' },
  { id: 'aws', name: 'AWS', icon: '☁️' },
  { id: 'docker', name: 'Docker', icon: '🐳' }
];

const TechStackStep = ({ formData, updateFormData }) => {
  const [newTagName, setNewTagName] = useState('');
  const [showAddTag, setShowAddTag] = useState(false);

  const handleAddTechStack = (tech) => {
    if (!formData.techStack.includes(tech.id)) {
      updateFormData({ 
        techStack: [...formData.techStack, tech.id] 
      });
    }
  };

  const handleRemoveTechStack = (techId) => {
    updateFormData({
      techStack: formData.techStack.filter(id => id !== techId)
    });
  };

  const handleAddCustomTag = () => {
    if (newTagName.trim() && !formData.techStack.includes(newTagName.trim().toLowerCase())) {
      const customId = newTagName.trim().toLowerCase();
      // 添加自定义标签到技术栈
      updateFormData({
        techStack: [...formData.techStack, customId]
      });
      setNewTagName('');
      setShowAddTag(false);
    }
  };

  // 获取展示用的技术栈对象数组
  const getSelectedTechStacks = () => {
    return formData.techStack.map(techId => {
      const existingTech = techStackOptions.find(t => t.id === techId);
      if (existingTech) return existingTech;
      // 处理自定义标签
      return { id: techId, name: techId.charAt(0).toUpperCase() + techId.slice(1), icon: '🏷️' };
    });
  };

  return (
    <div className="p-8 bg-[#1B1B1E]">
      <div className="max-w-4xl space-y-10">
        {/* GitHub链接 */}
        <div className="space-y-2">
          <h2 className="text-base font-normal text-white mb-2">Gtihub Link</h2>
          <div className="flex items-center w-full px-4 py-3 bg-[#0F1011] text-white rounded-lg border border-solid border-[#242425] focus-within:border-[#0092ff]">
            <span className="text-gray-400 mr-1">https://</span>
            <input
              type="text"
              placeholder="github.com/username/repository"
              className="bg-transparent border-none outline-none flex-1"
              value={formData.githubLink || ''}
              onChange={(e) => updateFormData({ githubLink: e.target.value })}
            />
          </div>
        </div>
        

        {/* 视频上传 */}
        <div className="space-y-2">
          <h2 className="text-base font-normal text-white mb-2">Vedio Link</h2>
          <div className="flex items-center w-full px-4 py-3 bg-[#0F1011] text-white rounded-lg border border-solid border-[#242425] focus-within:border-[#0092ff]">
            <span className="text-gray-400 mr-1">https://</span>
            <input
              type="text"
              className="bg-transparent border-none outline-none flex-1"
              value={formData.videoLink || ''}
              onChange={(e) => updateFormData({ videoLink: e.target.value })}
            />
          </div>
        </div>

        {/* 技术栈标签 */}
        <div className="space-y-5">
          <h2 className="text-base font-normal text-white">Tech Stack Tags</h2>
          
          {/* 已选择标签 */}
          <div className="flex flex-wrap gap-2">
            {getSelectedTechStacks().map(tech => (
              <div 
                key={tech.id}
                className="flex items-center justify-between px-4 py-2.5 bg-[#0F1011] text-white rounded-lg border border-solid border-[#242425]"
              >
                <span className="mr-2">{tech.name}</span>
                <button 
                  onClick={() => handleRemoveTechStack(tech.id)}
                  className="ml-2 text-[#0092ff]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            {/* 添加自定义标签的输入框 */}
            {showAddTag && (
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0F1011] text-white rounded-lg border border-solid border-[#242425]">
                <input
                  type="text"
                  placeholder="Enter Tag"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  className="bg-transparent border-none outline-none w-16"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTag()}
                  autoFocus
                />
                <button 
                  onClick={() => setShowAddTag(false)}
                  className="ml-2 text-[#0092ff]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* 预设标签 - 分组显示 */}
          <div className="space-y-3.5">
            {/* 第一行标签 */}
            <div className="flex flex-wrap gap-3.5">
              {['react', 'next', 'vue', 'web3', 'ethers'].map(id => {
                const tech = techStackOptions.find(t => t.id === id);
                return (
                  <button
                    key={id}
                    onClick={() => handleAddTechStack(tech)}
                    disabled={formData.techStack.includes(id)}
                    className={`px-6 py-4 border border-[#2B3740] rounded-lg hover:border-[#0092ff] ${
                      formData.techStack.includes(id) ? 'text-[#0092ff]' : 'text-white'
                    }`}
                  >
                    <span>+ {tech.name}</span>
                  </button>
                );
              })}
            </div>
            
            {/* 第二行标签 */}
            <div className="flex flex-wrap gap-3.5">
              {['node', 'java', 'golang', 'python', 'solidity'].map(id => {
                const tech = techStackOptions.find(t => t.id === id);
                return (
                  <button
                    key={id}
                    onClick={() => handleAddTechStack(tech)}
                    disabled={formData.techStack.includes(id)}
                    className={`px-6 py-4 border border-[#2B3740] rounded-lg hover:border-[#0092ff] ${
                      formData.techStack.includes(id) ? 'text-[#0092ff]' : 'text-white'
                    }`}
                  >
                    <span>+ {tech.name}</span>
                  </button>
                );
              })}
            </div>
            
            {/* 第三行标签 */}
            <div className="flex flex-wrap gap-3.5">
              {['rust', 'move'].map(id => {
                const tech = techStackOptions.find(t => t.id === id);
                return (
                  <button
                    key={id}
                    onClick={() => handleAddTechStack(tech)}
                    disabled={formData.techStack.includes(id)}
                    className={`px-6 py-4 border border-[#2B3740] rounded-lg hover:border-[#0092ff] ${
                      formData.techStack.includes(id) ? 'text-[#0092ff]' : 'text-white'
                    }`}
                  >
                    <span>+ {tech.name}</span>
                  </button>
                );
              })}
            </div>
            
            {/* 添加自定义标签按钮 */}
            <div className="flex-1">
              <button
                onClick={() => setShowAddTag(true)}
                className="w-full px-6 py-4 border border-[#2B3740] rounded-lg text-white hover:border-[#0092ff]"
              >
                + Add New Tag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackStep;