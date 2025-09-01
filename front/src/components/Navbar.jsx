export default function Navbar() {
  return (
    <div className="flex w-[1040px] h-12 items-center gap-2 px-6 py-5 bg-[#16161b] rounded-[10px] border border-solid border-[#242425]">
      {/* Search Input */}
      <div className="relative w-[356px] h-5">
        <div className="absolute w-5 h-5 top-0 left-0">
          <div className="relative w-4 h-4 top-0.5 left-0.5">
            <img
              className="absolute w-3.5 h-3.5 top-0 left-0"
              alt="Search"
              src="https://placehold.co/14x14/949fa8/FFFFFF"
            />
          </div>
        </div>
        
        <input 
          type="text"
          placeholder="Search for researches and audits on HackX"
          className="absolute top-0 left-7 font-normal text-[#949fa8] text-base leading-[18px] bg-transparent border-none outline-none w-[300px] placeholder-[#949fa8]"
        />
      </div>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-4">
        {/* Notifications */}
        <button className="w-6 h-6 text-[#949fa8] hover:text-white">
          <img src="https://placehold.co/24x24/949fa8/FFFFFF" alt="notifications" />
        </button>
        
        {/* User Avatar */}
        <div className="w-12 h-12 bg-[#472915] rounded-full flex items-center justify-center">
          <span className="text-white text-base">C</span>
        </div>
      </div>
    </div>
  );
}
