import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Workflow, 
  History, 
  KeyRound, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/flows', label: 'Flow Studio', icon: Workflow },
    { to: '/executions', label: 'Executions', icon: History },
    { to: '/credentials', label: 'Credentials', icon: KeyRound }
  ];

  return (
    <aside 
      className={`${
        isOpen ? 'w-60' : 'w-16'
      } transition-all duration-base ease-in-out bg-nova-dark text-white flex flex-col justify-between h-screen relative border-r border-gray-600/10 z-20`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-4 border-b border-gray-600/20 justify-between">
          {isOpen ? (
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 bg-nova-blue rounded-radius-md flex items-center justify-center font-bold text-white shadow-sm flex-shrink-0">
                NS
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold leading-none text-body-sm">NovaSpark</h1>
                <span className="text-[10px] text-gray-600">RPA Flow Studio</span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-nova-blue rounded-radius-md flex items-center justify-center font-bold text-white mx-auto shadow-sm">
              NS
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-3 rounded-radius-md text-body-sm font-medium transition-all duration-fast ${
                    isActive 
                      ? 'bg-nova-blue text-white shadow-md' 
                      : 'text-gray-600 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-2 border-t border-gray-600/20">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-radius-md text-body-sm font-medium text-gray-600 hover:bg-white/10 hover:text-white transition-all duration-fast"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Sidebar Collapse Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-900 shadow-md hover:bg-gray-100 transition-colors z-30"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </aside>
  );
}
