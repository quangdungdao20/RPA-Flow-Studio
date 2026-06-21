import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  List as ListIcon, 
  Play, 
  Edit, 
  Trash2, 
  X
} from 'lucide-react';

interface Flow {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'published' | 'draft' | 'disabled';
  trigger: 'Manual' | 'Schedule' | 'Webhook';
  lastRun: string;
  updatedAt: string;
}

export default function Flows() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Flow Form State
  const [newFlowName, setNewFlowName] = useState('');
  const [newFlowDesc, setNewFlowDesc] = useState('');
  const [newFlowTrigger, setNewFlowTrigger] = useState<'Manual' | 'Schedule' | 'Webhook'>('Manual');

  const [flows, setFlows] = useState<Flow[]>([
    { id: 'flow-1', name: 'Database Weekly Backup', description: 'Compress PostgreSQL tables and upload to backup servers.', version: 'v1.0.2', status: 'published', trigger: 'Schedule', lastRun: '12 mins ago', updatedAt: '2 hours ago' },
    { id: 'flow-2', name: 'ECB Rate Scraper Pipeline', description: 'Scrapes daily currency exchange rates and posts to internal API.', version: 'v2.1.0', status: 'published', trigger: 'Manual', lastRun: '2 hours ago', updatedAt: '1 day ago' },
    { id: 'flow-3', name: 'Active Directory User Syncer', description: 'Sync newly added employees from AD into workspace directory.', version: 'v1.0.0', status: 'failed' as any, trigger: 'Webhook', lastRun: '1 day ago', updatedAt: '2 days ago' },
    { id: 'flow-4', name: 'Slack Incident Alert Integration', description: 'Listens to database exceptions and notifies teams immediately.', version: 'v0.9.0', status: 'draft', trigger: 'Webhook', lastRun: 'Never', updatedAt: '3 days ago' },
  ]);

  const handleCreateFlow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFlowName.trim()) return;

    const newFlow: Flow = {
      id: `flow-${Date.now()}`,
      name: newFlowName,
      description: newFlowDesc || 'No description provided.',
      version: 'v1.0.0',
      status: 'draft',
      trigger: newFlowTrigger,
      lastRun: 'Never',
      updatedAt: 'Just now'
    };

    setFlows([newFlow, ...flows]);
    setNewFlowName('');
    setNewFlowDesc('');
    setNewFlowTrigger('Manual');
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlows(flows.filter(f => f.id !== id));
  };

  const filteredFlows = flows.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          flow.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || flow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toolbar / Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-gray-300 p-4 rounded-radius-lg shadow-sm">
        {/* Left Side Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search flows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 bg-white border border-gray-300 rounded-radius-md text-body-sm focus:border-nova-blue focus:outline-none transition-all"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 bg-white border border-gray-300 rounded-radius-md text-body-sm focus:border-nova-blue focus:outline-none transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Right Side Mode Toggles & Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex border border-gray-300 rounded-radius-md overflow-hidden bg-gray-100 p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-radius-sm transition-colors ${viewMode === 'grid' ? 'bg-white text-nova-blue shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-radius-sm transition-colors ${viewMode === 'table' ? 'bg-white text-nova-blue shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="h-9 px-4 bg-nova-blue text-white font-semibold rounded-radius-md text-body-sm flex items-center gap-1.5 hover:bg-nova-blue/90 shadow-md hover-lift"
          >
            <Plus className="w-4 h-4" />
            <span>Create Flow</span>
          </button>
        </div>
      </div>

      {/* Flows Layout Presentation */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFlows.map(flow => (
            <div 
              key={flow.id} 
              onClick={() => navigate(`/flows/${flow.id}`)}
              className="bg-white border border-gray-300 rounded-radius-lg p-5 shadow-md hover-lift cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-bold text-gray-900 hover:text-nova-blue transition-colors text-body-sm">{flow.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-radius-full ${
                    flow.status === 'published' ? 'bg-green-100 text-spark-green' :
                    flow.status === 'draft' ? 'bg-amber-100 text-spark-orange' : 'bg-red-100 text-spark-red'
                  }`}>
                    {flow.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2 line-clamp-2">{flow.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 font-semibold">
                <div className="flex items-center gap-4">
                  <span>Ver: {flow.version}</span>
                  <span>Trigger: {flow.trigger}</span>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Manual triggering ${flow.name}...`);
                    }}
                    className="p-1.5 rounded-radius-sm border border-gray-300 text-gray-600 hover:text-nova-blue hover:bg-nova-blue/5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(flow.id, e)}
                    className="p-1.5 rounded-radius-sm border border-gray-300 text-gray-600 hover:text-spark-red hover:bg-spark-red/5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-300 rounded-radius-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-body-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50 text-gray-600 font-semibold">
                  <th className="p-4">Flow Name</th>
                  <th className="p-4">Trigger</th>
                  <th className="p-4">Version</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Run</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFlows.map(flow => (
                  <tr 
                    key={flow.id} 
                    onClick={() => navigate(`/flows/${flow.id}`)}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-100/50 cursor-pointer transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <span className="font-bold text-gray-900">{flow.name}</span>
                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{flow.description}</p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{flow.trigger}</td>
                    <td className="p-4 font-mono text-xs text-gray-600">{flow.version}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-radius-full text-xs font-semibold ${
                        flow.status === 'published' ? 'bg-green-100 text-spark-green' :
                        flow.status === 'draft' ? 'bg-amber-100 text-spark-orange' : 'bg-red-100 text-spark-red'
                      }`}>
                        {flow.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 text-xs">{flow.lastRun}</td>
                    <td className="p-4 text-right">
                      <div className="inline-flex gap-2" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={() => alert(`Manual triggering ${flow.name}...`)}
                          className="p-1 rounded-radius-sm border border-gray-300 text-gray-600 hover:text-nova-blue hover:bg-nova-blue/5 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => navigate(`/flows/${flow.id}`)}
                          className="p-1 rounded-radius-sm border border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => handleDelete(flow.id, e as any)}
                          className="p-1 rounded-radius-sm border border-gray-300 text-gray-600 hover:text-spark-red hover:bg-spark-red/5 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Creation Flow Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-nova-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white border border-gray-300 rounded-radius-xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-fast">
            <div className="h-14 border-b border-gray-300 flex items-center justify-between px-6">
              <h3 className="font-bold text-gray-900 text-body-lg">Create New Flow</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateFlow} className="p-6 space-y-6">
              <div>
                <label className="block text-body-sm font-semibold text-gray-600 mb-2">Flow Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sync ERP Accounts"
                  value={newFlowName}
                  onChange={(e) => setNewFlowName(e.target.value)}
                  className="w-full h-10 px-4 bg-white border border-gray-300 rounded-radius-md text-body-sm focus:border-2 focus:border-nova-blue focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-body-sm font-semibold text-gray-600 mb-2">Description</label>
                <textarea
                  placeholder="Describe the workflow tasks..."
                  value={newFlowDesc}
                  onChange={(e) => setNewFlowDesc(e.target.value)}
                  className="w-full min-h-[80px] p-3 bg-white border border-gray-300 rounded-radius-md text-body-sm focus:border-2 focus:border-nova-blue focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-body-sm font-semibold text-gray-600 mb-2">Trigger Source</label>
                <select
                  value={newFlowTrigger}
                  onChange={(e: any) => setNewFlowTrigger(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-gray-300 rounded-radius-md text-body-sm focus:border-2 focus:border-nova-blue focus:outline-none transition-all"
                >
                  <option value="Manual">Manual (Run manually)</option>
                  <option value="Schedule">Schedule (Cron interval)</option>
                  <option value="Webhook">Webhook (HTTP trigger)</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="h-10 px-4 border border-gray-300 text-gray-600 rounded-radius-md text-body-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 bg-nova-blue text-white rounded-radius-md text-body-sm font-semibold hover:bg-nova-blue/90 shadow-md transition-colors"
                >
                  Create Flow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  // Helper alias to work around JSX local state binding
  function setIsOpen(val: boolean) {
    setIsModalOpen(val);
  }
}
