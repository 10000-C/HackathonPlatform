import HackathonNav from './HackathonNav';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex h-dvh w-dvw">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HackathonNav />
        <main className="flex-1 overflow-auto bg-gray-50 scroll-smooth hide-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
