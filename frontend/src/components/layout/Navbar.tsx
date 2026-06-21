import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const location = useLocation();
  
  // Dynamic page title based on path
  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    if (!path) return 'Dashboard';
    if (path.startsWith('flows/')) return 'Flow Designer';
    return path;
  };

  return (
    <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-6 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-1.5 rounded-radius-sm hover:bg-gray-100 transition-colors md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-h4 font-bold text-gray-900 capitalize">
          {getPageTitle()}
        </h2>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-nova-blue/10 text-nova-blue font-bold flex items-center justify-center text-body-sm border border-nova-blue/20 shadow-sm">
          AD
        </div>
        <span className="text-body-sm font-semibold text-gray-600 hidden sm:inline-block">Admin Developer</span>
      </div>
    </header>
  );
}
