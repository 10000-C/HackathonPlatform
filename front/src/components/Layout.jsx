import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#1b1a1d]">
      <Sidebar />
      <div className="flex-1">
        <div className="p-4">
          <Navbar />
        </div>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
