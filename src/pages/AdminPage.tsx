import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Activity, Database, Clock, RefreshCw, Cpu, ServerCrash, CheckCircle2 } from 'lucide-react';

interface Metric {
  name: string;
  cost: number;
  quota: number;
  latency: number;
  availability: number;
  priority: number;
  healthScore: number;
  lastSuccess: string | null;
  lastFailure: string | null;
  tokensRemaining: number;
}

export default function AdminPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/ai/admin/metrics');
      const data = await res.json();
      setMetrics(data.sort((a: Metric, b: Metric) => b.healthScore - a.healthScore));
      setLastUpdated(new Date());
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 font-sans selection:bg-kcg-red selection:text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,rgba(200,16,46,0.15),transparent_70%)]" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-6 h-6 text-kcg-red" />
              <h1 className="text-3xl font-display uppercase tracking-tighter">AI Gateway Admin</h1>
            </div>
            <p className="text-white/50 text-sm tracking-wide font-mono">
              ENTERPRISE MULTI-PROVIDER ORCHESTRATION ENGINE
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-white/40 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              LAST SYNC: {lastUpdated.toLocaleTimeString()}
            </span>
            <button onClick={fetchMetrics} className="hover:text-white transition-colors cursor-pointer" title="Force Refresh">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="w-8 h-8 text-kcg-red animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((provider, i) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-white/20 transition-all"
              >
                {/* Health Glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 blur-[50px] -z-10 rounded-full transition-colors duration-1000"
                  style={{ backgroundColor: provider.healthScore > 50 ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)' }}
                />

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold">{provider.name}</h2>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 flex items-center gap-1 mt-1">
                      Priority: {provider.priority.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-2xl font-black ${provider.healthScore > 80 ? 'text-green-500' : provider.healthScore > 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {provider.healthScore}%
                    </span>
                    <span className="text-[9px] uppercase font-mono text-white/30 tracking-widest">Health Score</span>
                  </div>
                </div>

                <div className="space-y-4 text-sm font-mono text-white/60">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-white/40" /> Latency</span>
                    <span className="text-white">{provider.latency} ms</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="flex items-center gap-2"><Database className="w-4 h-4 text-white/40" /> Cost/Token</span>
                    <span className="text-white">${provider.cost}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-white/40" /> Tokens Remaining</span>
                    <span className="text-white">{provider.tokensRemaining.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-[10px] font-mono">
                  <div>
                    <span className="text-white/40 block mb-1">LAST SUCCESS</span>
                    <span className="flex items-center gap-1 text-green-400">
                      <CheckCircle2 className="w-3 h-3" />
                      {provider.lastSuccess ? new Date(provider.lastSuccess).toLocaleTimeString() : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block mb-1">LAST FAILURE</span>
                    <span className="flex items-center gap-1 text-red-400">
                      <ServerCrash className="w-3 h-3" />
                      {provider.lastFailure ? new Date(provider.lastFailure).toLocaleTimeString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
