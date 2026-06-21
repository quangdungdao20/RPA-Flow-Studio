import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Save, Workflow } from 'lucide-react';

export default function Designer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
      {/* Designer Header */}
      <div className="flex justify-between items-center bg-white border border-gray-300 p-4 rounded-radius-lg shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/flows')}
            className="p-1 rounded hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-body-lg font-bold text-gray-900">Flow Designer ({id})</h3>
            <p className="text-xs text-gray-600 mt-0.5">Drag-and-drop workspace for automation actions</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Saving flow layout...')}
            className="h-9 px-4 border border-gray-300 text-gray-600 rounded-radius-md text-body-sm font-semibold hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          <button 
            onClick={() => alert('Executing flow trigger...')}
            className="h-9 px-4 bg-nova-blue text-white rounded-radius-md text-body-sm font-semibold hover:bg-nova-blue/90 shadow-md flex items-center gap-1.5 hover-lift"
          >
            <Play className="w-4 h-4" />
            <span>Run Flow</span>
          </button>
        </div>
      </div>

      {/* Editor Body Preview */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Node Catalog Placeholder */}
        <div className="w-64 bg-white border border-gray-300 rounded-radius-lg p-4 shadow-md flex flex-col gap-4 overflow-y-auto">
          <h4 className="text-body-sm font-bold text-gray-900 border-b border-gray-300 pb-2">Node Catalog</h4>
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Triggers</span>
              <div className="mt-2 flex flex-col gap-2">
                <div className="p-3 border border-nova-blue/20 bg-nova-blue/5 rounded-radius-md cursor-grab hover:bg-nova-blue/10 transition-colors flex items-center gap-2">
                  <Play className="w-4 h-4 text-nova-blue" />
                  <span className="text-xs font-semibold">Manual Trigger</span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Action Nodes</span>
              <div className="mt-2 flex flex-col gap-2">
                <div className="p-3 border border-gray-300 rounded-radius-md cursor-grab hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-semibold">Playwright Browser</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Area Placeholder */}
        <div className="flex-1 bg-white border border-gray-300 rounded-radius-lg shadow-md relative overflow-hidden flex items-center justify-center flex-col text-center p-6">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
          <div className="z-10 max-w-sm space-y-4">
            <div className="w-16 h-16 bg-nova-blue/10 text-nova-blue border border-nova-blue/20 rounded-radius-xl flex items-center justify-center mx-auto shadow-sm">
              <Workflow className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-body-lg font-bold text-gray-900">React Flow Canvas</h4>
              <p className="text-xs text-gray-600 mt-2">
                This canvas will render your visual nodes. Drag items from the catalog on the left to start designing. Full React Flow integration arrives in Sprint 2.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
