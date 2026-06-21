import { 
  Workflow, 
  CheckCircle2, 
  XCircle, 
  Server, 
  Clock, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Flows', value: '12', description: 'Active RPA pipelines', icon: Workflow, color: 'text-nova-blue bg-nova-blue/10 border-nova-blue/20' },
    { title: 'Success Rate', value: '98.4%', description: 'Last 100 runs', icon: CheckCircle2, color: 'text-spark-green bg-spark-green/10 border-spark-green/20' },
    { title: 'Failed Runs', value: '2', description: 'Requires attention', icon: XCircle, color: 'text-spark-red bg-spark-red/10 border-spark-red/20' },
    { title: 'Active Workers', value: '4', description: 'NATS cluster status', icon: Server, color: 'text-spark-orange bg-spark-orange/10 border-spark-orange/20' },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border border-gray-300 rounded-radius-lg p-6 shadow-md hover-lift">
              <div className="flex items-center justify-between">
                <span className="text-body-sm font-semibold text-gray-600">{stat.title}</span>
                <div className={`p-2 rounded-radius-md border ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-display font-bold text-gray-900 leading-none">{stat.value}</span>
                <p className="text-xs text-gray-600 mt-1.5">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics SVG Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-300 rounded-radius-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-body-lg font-bold text-gray-900">Execution Volume Trend</h3>
              <p className="text-xs text-gray-600 mt-0.5">Monthly breakdown of automated tasks</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-spark-green bg-green-50 px-2 py-1 rounded border border-green-200">
              <TrendingUp className="w-4 h-4" />
              <span>+18.4%</span>
            </div>
          </div>
          
          {/* Custom SVG Line Chart */}
          <div className="relative h-64 w-full">
            <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.00" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="600" y2="20" stroke="#F3F4F6" strokeWidth="1" />
              <line x1="0" y1="70" x2="600" y2="70" stroke="#F3F4F6" strokeWidth="1" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="#F3F4F6" strokeWidth="1" />
              <line x1="0" y1="170" x2="600" y2="170" stroke="#F3F4F6" strokeWidth="1" />
              <line x1="0" y1="210" x2="600" y2="210" stroke="#E5E7EB" strokeWidth="1.5" />
              
              {/* Area path */}
              <path 
                d="M 0 160 Q 100 180 150 110 T 300 70 T 450 140 T 600 40 L 600 210 L 0 210 Z" 
                fill="url(#chartGrad)" 
              />
              
              {/* Line path */}
              <path 
                d="M 0 160 Q 100 180 150 110 T 300 70 T 450 140 T 600 40" 
                fill="none" 
                stroke="#2563EB" 
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              
              {/* Highlight Nodes */}
              <circle cx="150" cy="110" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse" />
              <circle cx="300" cy="70" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="600" cy="40" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
            
            {/* Chart X Labels */}
            <div className="flex justify-between text-[10px] font-bold text-gray-600 mt-2 px-1">
              <span>JAN</span>
              <span>FEB</span>
              <span>MAR</span>
              <span>APR</span>
              <span>MAY</span>
              <span>JUN</span>
            </div>
          </div>
        </div>

        {/* Success Rate Pie/Doughnut Placeholder */}
        <div className="bg-white border border-gray-300 rounded-radius-lg p-6 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-body-lg font-bold text-gray-900">Task Reliability</h3>
            <p className="text-xs text-gray-600 mt-0.5">Success vs error distribution</p>
          </div>
          
          {/* Custom SVG Radial Gauge */}
          <div className="flex justify-center items-center py-6 relative">
            <svg className="w-36 h-36" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-spark-green"
                strokeWidth="3.5"
                strokeDasharray="98.4, 100"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-h2 font-bold text-gray-900">98.4%</span>
              <span className="text-[10px] font-semibold text-spark-green uppercase tracking-wider">Reliable</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-spark-green rounded-full"></div>
              <span>Success (98.4%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-spark-red rounded-full"></div>
              <span>Errors (1.6%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Executions Table */}
      <div className="bg-white border border-gray-300 rounded-radius-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-body-lg font-bold text-gray-900">Recent Executions</h3>
          <button className="text-xs text-nova-blue hover:underline font-semibold flex items-center gap-1">
            <span>View all histories</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-gray-600 font-semibold">
                <th className="pb-3">Flow Name</th>
                <th className="pb-3">Execution ID</th>
                <th className="pb-3">Trigger Type</th>
                <th className="pb-3">Duration</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Started At</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Database Weekly Backup', id: 'exec-d736a18', trigger: 'Cron Schedule', duration: '4.2s', status: 'success', time: '12 mins ago' },
                { name: 'ECB Rate Scraper Pipeline', id: 'exec-83f12a9', trigger: 'Manual Run', duration: '12.8s', status: 'success', time: '2 hours ago' },
                { name: 'Active Directory User Syncer', id: 'exec-229ad12', trigger: 'Webhook API', duration: '0.8s', status: 'failed', time: '1 day ago' },
              ].map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-100/50 transition-colors">
                  <td className="py-4 font-bold text-gray-900">{item.name}</td>
                  <td className="py-4 font-mono text-xs text-gray-600">{item.id}</td>
                  <td className="py-4 text-gray-600">{item.trigger}</td>
                  <td className="py-4 text-gray-600 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span>{item.duration}</span>
                  </td>
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
