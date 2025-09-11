import React from 'react';

const HackathonBanner = ({ hackathon }) => {
  return (
    <div className="w-full bg-[#131a26] rounded-lg mb-6 overflow-hidden">
      <div className="relative">
        {/* Banner background image */}
        <div className="h-[450px] w-full overflow-hidden">
          <img 
            src={hackathon.bannerImage || "https://placehold.co/1200x500/131a26/2b3740"} 
            alt={hackathon.title} 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#131a26] opacity-90"></div>
        </div>
        
        {/* Banner content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex flex-col space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{hackathon.title}</h2>
              <p className="text-white opacity-80 max-w-xl text-sm">
                Calling All Builders, Dreamers, and Rule-Breakers! The crypto world is a wild ride—full of chaos, opportunity, and endless what-ifs. But one thing's for sure: innovation thrives where builders and storytellers collide.
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-[#0092ff] text-white py-2.5 px-5 rounded-lg text-sm font-medium">
                Register Now
              </button>
              <button className="bg-transparent border border-[#2b3740] text-white py-2.5 px-5 rounded-lg text-sm font-medium">
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonBanner;
