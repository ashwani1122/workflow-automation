// components/ProductMockup.tsx
import Image from "next/image";
import { 
  Layers, 
  Search, 
  Workflow, 
  KeyRound, 
  Play, 
  CreditCard, 
  LogOut, 
  Settings, 
  Trash2, 
  Plus, 
  Save, 
  Webhook, 
  DatabaseZap, 
  Slack, 
  Share2, 
  Globe 
} from "lucide-react";

// --- Sub-components for structure ---

// Mac traffic light buttons
const TrafficLights = () => (
  <div className="flex gap-1.5 px-4">
    {['bg-red-500', 'bg-yellow-400', 'bg-green-500'].map(color => (
      <div key={color} className={`w-3 h-3 rounded-full ${color}`}></div>
    ))}
  </div>
);

// Icon for the node type (e.g., Discord, Slack)
const NodeIcon = ({ icon: Icon, color }: { icon: any, color: string }) => (
  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
  </div>
);

// A single canvas Node component
const WorkflowNode = ({ id, label, status, icon, color, x, y, connections = [], trigger = false }: any) => {
  const nodeIcon = trigger ? 
    <div className="w-10 h-10 border-2 border-slate-300 rounded-xl flex items-center justify-center bg-slate-100">
      <Play className="w-5 h-5 text-slate-600 fill-slate-600" />
    </div> : <NodeIcon icon={icon} color={color} />;

  return (
    <div style={{ left: `${x}px`, top: `${y}px` }} className="absolute flex flex-col items-center gap-3 z-20 group">
      
      {/* Node Body */}
      <div className="w-[160px] p-3 bg-white border border-slate-200 rounded-2xl shadow-sm group-hover:border-slate-300 transition relative">
        <div className="flex items-center gap-3">
          {nodeIcon}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-slate-950 truncate">{label}</p>
            <p className="text-[11px] text-slate-500 leading-tight truncate">{status}</p>
          </div>
        </div>
        
        {/* Optional context menu (Settings/Delete) */}
        {!trigger && (
          <div className="absolute -top-3 -right-3 flex gap-1 bg-white p-1 rounded-full shadow-md border border-slate-100 opacity-0 group-hover:opacity-100 transition scale-75 group-hover:scale-100">
            <button className="p-1 hover:bg-slate-100 rounded text-slate-500"><Settings size={14}/></button>
            <button className="p-1 hover:bg-slate-100 rounded text-red-500"><Trash2 size={14}/></button>
          </div>
        )}
      </div>

      {/* SVG Connections (simplified straight lines) */}
      {connections.map((targetX: number, index: number) => {
        const dx = targetX - 160;
        const dy = 0; // Connections are horizontal between nodes on same row in simplified example
        return (
          <svg key={index} className="absolute left-[160px] top-[26px] overflow-visible z-10" width={dx} height="2">
            <path d={`M 0 0 H ${dx}`} stroke="#CBD5E1" strokeWidth="2" fill="none" />
          </svg>
        );
      })}
    </div>
  );
};

export default function ProductMockup() {
  return (
    <div className="w-full h-full text-slate-900 text-sm flex flex-col font-sans">
      
      {/* --- BROWSER HEADER --- */}
      <div className="bg-slate-100 border-b border-slate-200 h-[60px] flex items-center justify-between px-2 shrink-0">
        <TrafficLights />
        
        {/* Breadcrumb / Workflow Title */}
        <div className="flex items-center gap-2 font-medium text-slate-600">
          <Workflow size={16} />
          <span>Workflows</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-semibold">brief-teeny-solstice</span>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-2 px-4">
          <button className="px-4 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center gap-1.5 font-semibold">
            <Search size={16} />
          </button>
          <button className="px-5 py-1.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 flex items-center gap-2 font-semibold shadow-sm">
            <Save size={16} strokeWidth={2.5}/> Save
          </button>
          <button className="w-9 h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600">
            <Plus size={18} strokeWidth={2.5}/>
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        
        {/* --- LEFT SIDEBAR --- */}
        <aside className="w-[240px] border-r border-slate-200 bg-slate-50 p-6 flex flex-col justify-between shrink-0">
          
          <div className="space-y-10">
            {/* Sidebar Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-orange-500 rounded flex items-center justify-center rotate-[-10deg]">
                <Layers className="text-white w-4 h-4" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight text-[#111827]">FlowForge</span>
            </div>

            {/* Nav Menu */}
            <nav className="space-y-1">
              {[
                { label: 'Workflows', icon: Workflow, active: true },
                { label: 'Credentials', icon: KeyRound },
                { label: 'Executions', icon: Play },
              ].map(item => (
                <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold ${item.active ? 'bg-white text-orange-600 shadow-inner border border-slate-100' : 'text-slate-600 hover:text-slate-950'}`}>
                  <item.icon size={20} className={item.active ? '' : 'text-slate-400'} strokeWidth={item.active ? 2.5 : 2} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Sidebar Bottom */}
          <div className="space-y-2 pt-10 border-t border-slate-200">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100">
              <CreditCard size={18} className="text-slate-400" />
              <span>Billing Portal</span>
            </button>
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs border-2 border-white shadow">ND</div>
              <button className="flex-1 text-left font-semibold text-slate-950">Sign out</button>
              <LogOut size={16} className="text-slate-400" />
            </div>
          </div>
        </aside>

        {/* --- WORKFLOW CANVAS (Main Area) --- */}
        <main className="flex-1 bg-white relative overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]">
          
          {/* Canvas Nodes */}
          {/* Replicating position/connections from design. SVG paths are simplified. */}
          
          {/* Column 1 */}
          <WorkflowNode x={80} y={100} label="When clicking..." status="Trigger" trigger={true} connections={[320, 320, 320]} />
          <WorkflowNode x={80} y={240} label="Google Form" status="When form is submitted" icon={Webhook} color="bg-purple-600" connections={[320]} />
          <WorkflowNode x={80} y={380} label="Stripe" status="When charge succeeds" icon={CreditCard} color="bg-blue-600" connections={[560]} />

          {/* Column 2 */}
          <WorkflowNode x={320} y={100} label="Discord" status="Send message" icon={Share2} color="bg-blue-500" connections={[560]} />
          <WorkflowNode x={320} y={240} label="Anthropic" status="Analyze content" icon={DatabaseZap} color="bg-orange-500" connections={[560, 560]} />

          {/* Column 3 */}
          <WorkflowNode x={560} y={100} label="Slack" status="Notify channel" icon={Slack} color="bg-teal-600" connections={[800]} />
          <WorkflowNode x={560} y={240} label="Gemini" status="Extract data" icon={Globe} color="bg-rose-500" connections={[800]} />
          <WorkflowNode x={560} y={380} label="HTTP Request" status="POST data" icon={DatabaseZap} color="bg-slate-600" connections={[800]} />

          {/* Column 4 (End Node) */}
          <WorkflowNode x={800} y={240} label="Anthropic" status="Final Summary" icon={DatabaseZap} color="bg-orange-500" />

          {/* Bottom Banner (Example Workflow) */}
          <div className="absolute bottom-0 left-0 right-0 h-10 border-t border-slate-200 bg-slate-50 flex items-center px-6 text-xs text-slate-500 z-30">
            Example workflow: <span className="font-mono text-slate-900 ml-1.5">brief-teeny-solstice</span>
          </div>

          {/* Bottom Execute Button */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30">
            <button className="px-6 py-2.5 rounded-full bg-orange-600 text-white hover:bg-orange-700 flex items-center gap-2.5 font-bold shadow-lg shadow-orange-950/20">
              <Play size={18} strokeWidth={3} className="fill-white"/> Execute workflow
            </button>
          </div>

          {/* Grid Overlay / Controls (Simplified) */}
          <div className="absolute top-4 left-4 z-40 space-y-2">
            {[Plus, Settings, Webhook].map((Icon, i) => (
              <button key={i} className="w-10 h-10 border border-slate-200 bg-white rounded-xl shadow flex items-center justify-center text-slate-600 hover:bg-slate-50">
                <Icon size={18} />
              </button>
            ))}
          </div>

        </main>

      </div>
    </div>
  );
}