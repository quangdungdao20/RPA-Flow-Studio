import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Guard check for authentication token
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-nova-light font-sans text-gray-900 overflow-hidden">
      {/* Sidebar Layout */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Right Side Content Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation Navbar */}
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Inner page content outlet */}
        <main className="flex-1 overflow-y-auto p-6 bg-nova-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
