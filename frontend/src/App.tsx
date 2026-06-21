import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Workflow, 
  History, 
  KeyRound, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu,
  ChevronRight,
  Play,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'designer' | 'executions' | 'credentials'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-nova-light font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'w-60' : 'w-16'
        } transition-all duration-base ease-in-out bg-nova-dark text-white flex flex-col justify-between`}
      >
        <div>
          {/* Header */}
          <div className="h-16 flex items-center px-4 border-b border-gray-600/20 justify-between">
            {sidebarOpen ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-nova-blue rounded-radius-md flex items-center justify-center font-bold text-white shadow-sm">
                  NS
                </div>
                <div>
                  <h1 className="font-bold leading-none text-base">NovaSpark</h1>
                  <span className="text-[10px] text-gray-300">RPA Flow Studio</span>
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 bg-nova-blue rounded-radius-md flex items-center justify-center font-bold text-white mx-auto">
                NS
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-1 px-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'designer', label: 'Flow Designer', icon: Workflow },
              { id: 'executions', label: 'Executions', icon: History },
              { id: 'credentials', label: 'Credentials', icon: KeyRound }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-radius-md text-sm font-medium transition-all duration-fast ${
                    isActive 
                      ? 'bg-nova-blue text-white shadow-md' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-2 border-t border-gray-600/20">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-radius-md text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-fast">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-6 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-radius-sm hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-gray-900 capitalize">
              {activeTab === 'designer' ? 'Flow Designer' : activeTab}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-nova-blue/10 text-nova-blue font-bold flex items-center justify-center text-sm border border-nova-blue/20">
              AD
            </div>
            <span className="text-sm font-medium text-gray-600 hidden sm:inline-block">Admin Developer</span>
          </div>
        </header>

        {/* Dynamic Page Rendering */}
        <main className="flex-1 overflow-y-auto p-6 bg-nova-light">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'designer' && <DesignerView />}
          {activeTab === 'executions' && <ExecutionsView />}
          {activeTab === 'credentials' && <CredentialsView />}
        </main>
      </div>
    </div>
  );
}

// Subviews (Mock data representation matching NovaSpark specs)

function DashboardView() {
  const cards = [
    { title: 'Total Flows', value: '12', description: 'Active RPA pipelines', icon: Workflow, color: 'text-nova-blue bg-nova-blue/10 border-nova-blue/20' },
    { title: 'Success Rate', value: '98.4%', description: 'Last 100 runs', icon: CheckCircle2, color: 'text-spark-green bg-spark-green/10 border-spark-green/20' },
    { title: 'Failed Runs', value: '2', description: 'Requires attention', icon: XCircle, color: 'text-spark-red bg-spark-red/10 border-spark-red/20' },
    { title: 'Active Workers', value: '4', description: 'Listening on NATS', icon: AlertCircle, color: 'text-spark-orange bg-spark-orange/10 border-spark-orange/20' },
  ];

  return (
    <div className="space-y-6">
      {/* Grid of stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white border border-gray-300 rounded-radius-lg p-6 shadow-md hover-lift">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{card.title}</span>
                <div className={`p-2 rounded-radius-md border ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">{card.value}</span>
                <p className="text-xs text-gray-600 mt-1">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent executions table */}
      <div className="bg-white border border-gray-300 rounded-radius-lg shadow-md p-6">
        <h3 className="text-base font-bold mb-4">Recent Executions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-gray-600 font-medium">
                <th className="pb-3">Flow Name</th>
                <th className="pb-3">Execution ID</th>
                <th className="pb-3">Triggered By</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Started At</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Backup Database Flow', id: 'exec-83b4c91', user: 'Cron System', status: 'success', time: '10 mins ago' },
                { name: 'Scrape Exchange Rates', id: 'exec-38f1a23', user: 'Admin Developer', status: 'success', time: '2 hours ago' },
                { name: 'Sync Employee Directory', id: 'exec-22d9b87', user: 'Admin Developer', status: 'failed', time: '1 day ago' },
              ].map((item, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-100/50 transition-colors">
                  <td className="py-4 font-semibold text-gray-900">{item.name}</td>
                  <td className="py-4 font-mono text-xs text-gray-600">{item.id}</td>
                  <td className="py-4 text-gray-600">{item.user}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-radius-full text-xs font-semibold ${
                      item.status === 'success' 
                        ? 'bg-green-100 text-spark-green' 
                        : 'bg-red-100 text-spark-red'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-600 text-xs">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DesignerView() {
  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      {/* Node Catalog Panel */}
      <div className="w-64 bg-white border border-gray-300 rounded-radius-lg p-4 shadow-md flex flex-col gap-4">
        <h4 className="text-sm font-bold text-gray-900 border-b border-gray-300 pb-2">Node Catalog</h4>
        
        {/* Node Categories */}
        <div className="space-y-4 overflow-y-auto flex-1">
          <div>
            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Triggers</span>
            <div className="mt-2 flex flex-col gap-2">
              <div className="p-3 border border-nova-blue/20 bg-nova-blue/5 rounded-radius-md cursor-grab hover:bg-nova-blue/10 transition-colors flex items-center gap-2">
                <Play className="w-4 h-4 text-nova-blue" />
                <span className="text-xs font-medium">Manual Trigger</span>
              </div>
              <div className="p-3 border border-nova-blue/20 bg-nova-blue/5 rounded-radius-md cursor-grab hover:bg-nova-blue/10 transition-colors flex items-center gap-2">
                <History className="w-4 h-4 text-nova-blue" />
                <span className="text-xs font-medium">Cron Schedule</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Action Nodes</span>
            <div className="mt-2 flex flex-col gap-2">
              <div className="p-3 border border-gray-300 rounded-radius-md cursor-grab hover:bg-gray-100 transition-colors flex items-center gap-2">
                <Workflow className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-medium">Playwright Browser</span>
              </div>
              <div className="p-3 border border-gray-300 rounded-radius-md cursor-grab hover:bg-gray-100 transition-colors flex items-center gap-2">
                <Workflow className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-medium">Python Script</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Canvas Placeholder */}
      <div className="flex-1 bg-white border border-gray-300 rounded-radius-lg shadow-md relative overflow-hidden flex items-center justify-center flex-col text-center p-6">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
        <div className="z-10 max-w-sm space-y-4">
          <div className="w-16 h-16 bg-nova-blue/10 text-nova-blue border border-nova-blue/20 rounded-radius-xl flex items-center justify-center mx-auto shadow-sm">
            <Workflow className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-bold">Flow Studio Canvas</h4>
            <p className="text-xs text-gray-600 mt-2">
              React Flow component will render here. Drag nodes from the sidebar, connect points, and wire up execution pathways.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExecutionsView() {
  return (
    <div className="bg-white border border-gray-300 rounded-radius-lg shadow-md p-6">
      <h3 className="text-base font-bold mb-4">Complete Execution History</h3>
      <div className="space-y-4">
        {[
          { id: 'exec-83b4c91', flow: 'Backup Database Flow', status: 'success', time: '10 mins ago', duration: '4.2s' },
          { id: 'exec-38f1a23', flow: 'Scrape Exchange Rates', status: 'success', time: '2 hours ago', duration: '12.8s' },
          { id: 'exec-22d9b87', flow: 'Sync Employee Directory', status: 'failed', time: '1 day ago', duration: '0.8s', error: 'Database timeout error' },
        ].map((exec, idx) => (
          <div key={idx} className="border border-gray-300 rounded-radius-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-600 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900">{exec.flow}</span>
                <span className="font-mono text-xs text-gray-600 px-2 py-0.5 bg-gray-100 rounded border border-gray-300">{exec.id}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span>Triggered: {exec.time}</span>
                <span>Duration: {exec.duration}</span>
              </div>
              {exec.error && <p className="text-xs text-spark-red font-semibold mt-1">Error: {exec.error}</p>}
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-radius-full text-xs font-semibold ${
                exec.status === 'success' 
                  ? 'bg-green-100 text-spark-green' 
                  : 'bg-red-100 text-spark-red'
              }`}>
                {exec.status}
              </span>
              <button className="text-xs text-nova-blue font-bold hover:underline px-3 py-1 rounded border border-nova-blue/20 hover:bg-nova-blue/5 transition-colors">
                View Logs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CredentialsView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-bold">Secure Credentials Store</h3>
          <p className="text-xs text-gray-600 mt-1">Manage api tokens, connection strings, and login secrets securely.</p>
        </div>
        <button className="px-4 py-2 bg-nova-blue text-white rounded-radius-md text-sm font-semibold hover:bg-nova-blue/90 shadow-md hover-lift">
          + Add Credential
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'SMTP Server Authentication', type: 'Username/Password', key: 'smtp_auth_key', domain: 'mail.smtp.corp' },
          { name: 'Telegram Bot API Token', type: 'Secret Token', key: 'telegram_api_token', domain: 'api.telegram.org' },
          { name: 'Internal Postgres DB', type: 'Connection String', key: 'postgres_db_url', domain: 'db-prod.internal' },
        ].map((cred, i) => (
          <div key={i} className="bg-white border border-gray-300 rounded-radius-lg p-5 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-900 text-sm">{cred.name}</h4>
                <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-300">{cred.type}</span>
              </div>
              <p className="text-xs font-mono text-gray-600 mt-3 bg-gray-100 p-2 rounded border border-gray-300 select-all">
                {cred.key}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
              <span>Domain: {cred.domain}</span>
              <button className="text-nova-blue hover:underline font-semibold">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
