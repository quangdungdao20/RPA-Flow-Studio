import { Plus } from 'lucide-react';

export default function Credentials() {
  const credentials = [
    { name: 'SMTP Server Authentication', type: 'Username/Password', key: 'smtp_auth_key', domain: 'mail.smtp.corp' },
    { name: 'Telegram Bot API Token', type: 'Secret Token', key: 'telegram_api_token', domain: 'api.telegram.org' },
    { name: 'Internal Postgres DB', type: 'Connection String', key: 'postgres_db_url', domain: 'db-prod.internal' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white border border-gray-300 p-4 rounded-radius-lg shadow-sm">
        <div>
          <h3 className="text-body-lg font-bold text-gray-900">Secure Credentials Store</h3>
          <p className="text-xs text-gray-600 mt-0.5">Manage credentials, API keys, and configurations securely.</p>
        </div>
        <button 
          onClick={() => alert('Feature coming in Sprint 4')}
          className="h-9 px-4 bg-nova-blue text-white font-semibold rounded-radius-md text-body-sm flex items-center gap-1.5 hover:bg-nova-blue/90 shadow-md hover-lift"
        >
          <Plus className="w-4 h-4" />
          <span>Add Credential</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credentials.map((cred, i) => (
          <div key={i} className="bg-white border border-gray-300 rounded-radius-lg p-5 shadow-md flex flex-col justify-between hover-lift">
            <div>
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-900 text-body-sm">{cred.name}</h4>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-300">{cred.type}</span>
              </div>
              <p className="text-xs font-mono text-gray-600 mt-4 bg-gray-100 p-2.5 rounded border border-gray-300 select-all">
                {cred.key}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 font-semibold">
              <span>Domain: {cred.domain}</span>
              <button 
                onClick={() => alert('Edit feature coming in Sprint 4')}
                className="text-nova-blue hover:underline"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
