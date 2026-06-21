import { Clock } from 'lucide-react';

export default function Executions() {
  const executions = [
    { id: 'exec-d736a18', flow: 'Database Weekly Backup', status: 'success', time: '12 mins ago', duration: '4.2s' },
    { id: 'exec-83f12a9', flow: 'ECB Rate Scraper Pipeline', status: 'success', time: '2 hours ago', duration: '12.8s' },
    { id: 'exec-229ad12', flow: 'Active Directory User Syncer', status: 'failed', time: '1 day ago', duration: '0.8s', error: 'Database timeout exception connecting to LDAP' },
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-radius-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-body-lg font-bold text-gray-900">Execution History</h3>
          <p className="text-xs text-gray-600 mt-0.5">Audit log of all automated runner triggers</p>
        </div>
      </div>

      <div className="space-y-4">
        {executions.map((exec, idx) => (
          <div key={idx} className="border border-gray-300 rounded-radius-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-nova-blue transition-colors">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 text-body-sm">{exec.flow}</span>
                <span className="font-mono text-xs text-gray-600 px-2 py-0.5 bg-gray-100 rounded border border-gray-300">{exec.id}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span>Triggered: {exec.time}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{exec.duration}</span>
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
              <button 
                onClick={() => alert(`Showing execution details for ${exec.id}`)}
                className="text-xs text-nova-blue font-bold hover:underline px-3 py-1 rounded border border-nova-blue/20 hover:bg-nova-blue/5 transition-colors"
              >
                View Logs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
