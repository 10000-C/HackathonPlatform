import React, { useState } from 'react';
import HackathonSidebar from './HackathonSidebar';

const ScheduleTab = ({ hackathon }) => {
  // 从hackathon对象获取日程数据
  const schedule = (hackathon.schedule || []).map((event, index) => ({
    id: index + 1,
    ...event,
    status: 'upcoming' // 初始设置为upcoming，后面会根据日期计算实际状态
  }));

  // 根据当前日期判断事件状态
  const now = new Date();
  const updatedSchedule = schedule.map(event => {
    // 解析开始和结束时间
    const eventStartDate = new Date(`${event.startDate} ${event.startTime}`);
    const eventEndDate = new Date(`${event.endDate} ${event.endTime}`);

    let status;
    if (now >= eventStartDate && now <= eventEndDate) {
      status = 'active';
    } else if (now > eventEndDate) {
      status = 'completed';
    } else {
      status = 'upcoming';
    }

    return { ...event, status };
  });

  // 获取"Live"事件（当前活跃的事件）
  const liveEvent = updatedSchedule.find(event => event.status === 'active') || updatedSchedule[0];

  // 用于跟踪当前选中的事件
  const [selectedEvent, setSelectedEvent] = useState(liveEvent);

  // 处理时间栏点击事件
  const handleTimeClick = (event) => {
    setSelectedEvent(event);
    // 平滑滚动到顶部
    // document.querySelector('.schedule-container')?.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start'
    // });
  };

  // 渲染事件卡片
  const renderEvent = (event) => {
    return (
      <div key={event.id} className="px-10 py-8">
        <h3 className="text-xl font-semibold text-white mb-3">{event.title}</h3>
        <p className="text-white/80 mb-10 leading-relaxed">{event.description}</p>

        <div className="w-full h-[1px] bg-[#2b3640] opacity-70 mb-8"></div>

        <div className="flex flex-row space-x-16">
          {event.speaker && (
            <div className="flex flex-col min-w-[200px]">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 opacity-60 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span className="text-white/60">Speaker</span>
              </div>
              <div className="flex flex-row items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                  <img src={`https://placehold.co/400x400/2b3640/white?text=${event.speaker}`} alt={event.speaker} className="w-full h-full object-cover" />
                </div>
                <span className="text-white text-sm">{event.speaker}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col min-w-[150px]">
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 opacity-60 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <span className="text-white/60">Time</span>
            </div>
            <span className="text-white text-sm">{`${event.startTime} - ${event.endTime}`}</span>
          </div>

          {event.location && (
            <div className="flex flex-col min-w-[150px]">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 opacity-60 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span className="text-white/60">Location</span>
              </div>
              <span className="text-white text-sm">{event.location}</span>
            </div>
          )}
        </div>
        
        {event.notes && (
          <div className="mt-6">
            <span className="text-white/60 text-sm">Notes:</span>
            <p className="text-white/80 text-sm mt-1">{event.notes}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pb-16">
      {/* Content grid with sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="lg:flex-grow">
          <div className="max-w-[900px] schedule-container">
            <section>
              <div className="border border-[#2b3640] rounded-lg overflow-hidden">
                {/* 时间线和内容区 */}
                <div className="flex flex-col md:flex-row">
                  {/* 左侧时间线 */}
                  <div className="w-full md:w-[227px] border-r border-[#2b3640] flex-shrink-0">
                    <div>
                      {updatedSchedule.map((event, index) => (
                        <div
                          key={event.id}
                          className={`relative cursor-pointer transition-colors duration-200 h-[80px] ${selectedEvent.id === event.id ? 'bg-[#0092FF] bg-opacity-15' : 'hover:bg-[#2b3640] hover:bg-opacity-30'
                            }`}
                          onClick={() => handleTimeClick(event)}
                        >
                          <div className="text-white py-4 px-6 text-sm md:text-base flex items-center h-full">
                            <div className="whitespace-pre-line leading-relaxed">
                              <span className="opacity-90 whitespace-nowrap">{event.startDate}</span>
                              {event.endDate && (
                                <>
                                  <span className="font-medium my-1">-</span>
                                  <span className="opacity-90 whitespace-nowrap">{event.endDate}</span>
                                </>
                              )}
                            </div>
                          </div>
                          {index < updatedSchedule.length - 1 && <div className="border-b border-[#2b3640] w-full"></div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 右侧内容区 */}
                  <div className="flex-1 relative flex">
                    <div className="relative p-8 md:p-10 items-center justify-center w-full">
                      {selectedEvent.title === 'Registration' && (selectedEvent.status === 'active') ? (
                        <div className="flex flex-col items-center justify-center h-full py-12">
                          <div className="flex flex-col items-center mb-8">
                            <div className="bg-[#4EF467]/30 px-3.5 py-1.5 rounded-full mb-5">
                              <span className="text-xs font-bold text-white">Live</span>
                            </div>
                            <h2 className="text-4xl font-bold text-white text-center">Registration</h2>
                          </div>
                        </div>
                      ) : (
                        renderEvent(selectedEvent)
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-0">
            <HackathonSidebar hackathon={hackathon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTab;