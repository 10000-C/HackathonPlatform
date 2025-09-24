export default function Navbar() {
  return (
    <div className="flex w-full h-12 items-center gap-2 px-6 py-5 bg-[#16161b] rounded-[10px] border border-solid border-[#242425]">
      {/* Search Input */}
      <div className="relative w-[356px] h-5">
        <div className="absolute w-5 h-5 top-0 left-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3333 13.3333L17.5 17.5" stroke="#949FA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.5 8.33333C2.5 11.5549 5.11175 14.1667 8.33333 14.1667C9.9445 14.1667 11.3967 13.5263 12.4381 12.4848C13.4723 11.4467 14.1667 9.99175 14.1667 8.33333C14.1667 5.11175 11.5549 2.5 8.33333 2.5C5.11175 2.5 2.5 5.11175 2.5 8.33333Z" stroke="#949FA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <input 
          type="text"
          placeholder="Search for researches and audits on HackX"
          className="absolute top-0 left-7 font-normal text-[#949fa8] text-base leading-[18px] bg-transparent border-none outline-none w-[500px] placeholder-[#949fa8]"
        />
      </div>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-4">
        {/* Notifications */}
        <button className="w-6 h-6 text-[#949fa8] hover:text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 18.75C8.5 21.2353 10.5147 23.25 13 23.25C15.4853 23.25 17.5 21.2353 17.5 18.75H8.5Z" stroke="#949FA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 9.5C3 5.08172 6.58172 1.5 11 1.5H13C17.4183 1.5 21 5.08172 21 9.5V18.75H3V9.5Z" stroke="#949FA8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* User Avatar */}
        <div className="w-12 h-12 bg-[#472915] rounded-full flex items-center justify-center">
          <span className="text-white text-base">C</span>
        </div>
      </div>
    </div>
  );
}
