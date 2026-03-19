"use client";

import Link from "next/link";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Terminal,
  GitBranchPlus,
  Play,
  Layers,
  Cpu,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    async function loadSession() {
      const { data } = await authClient.getSession();
      setSession(data);
    }
    loadSession();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/70 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:scale-110 transition-transform">
              <Zap size={20} className="fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">FlowForge</span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#integrations" className="hover:text-white transition-colors">Integrations</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-4">
            {!session?.user ? (
              <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">
                Sign In
              </Link>
            ) : (
              <button onClick={() => authClient.signOut()} className="text-sm font-medium text-slate-400">
                Logout
              </button>
            )}
            <Button
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-6 shadow-lg shadow-indigo-500/20 border-0"
              onClick={() => router.push("/workflows")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            v2.0 is now live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
          >
            Automate with <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Precision.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The visual workflow engine for modern engineering teams. 
            Deploy complex logic in seconds, not cycles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="rounded-full px-8 h-14 text-base bg-white text-black hover:bg-slate-200 transition-all hover:scale-105">
              Start Building Free <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-black border-white/10 hover:bg-white/5 transition-all">
              <Play className="mr-2 fill-current" size={16} /> Watch Demo
            </Button>
          </motion.div>

          {/* Abstract Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 relative max-w-5xl mx-auto group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-900 border border-white/10 rounded-2xl aspect-video shadow-2xl overflow-hidden">
               {/* Replace this with an actual screenshot or interactive element */}
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
               <div className="flex items-center justify-center h-full">
                  <img src={"../../logos/hero.png"} alt="" />
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid (Bento Style) */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <FeatureCard 
              icon={<GitBranchPlus />} 
              title="Visual Logic Canvas" 
              desc="Drag-and-drop nodes to create multi-step branching workflows without writing a single line of code."
              className="h-full bg-gradient-to-br from-indigo-500/10 to-transparent"
            />
          </div>
          <div className="md:col-span-4">
            <FeatureCard 
              icon={<ShieldCheck />} 
              title="Enterprise Security" 
              desc="SOC2 compliant out of the box."
            />
          </div>
          <div className="md:col-span-4">
            <FeatureCard 
              icon={<Terminal />} 
              title="Code-first" 
              desc="Full TS/Python support."
            />
          </div>
          <div className="md:col-span-8">
            <FeatureCard 
              icon={<Globe />} 
              title="Global Edge Deployment" 
              desc="Your workflows run at the edge, ensuring sub-50ms latency for users anywhere in the world."
              className="bg-gradient-to-bl from-purple-500/10 to-transparent"
            />
          </div>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-indigo-600 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/20">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 blur-3xl rounded-full" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Ready to scale your operations?</h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Join 2,000+ teams building the future of automation on FlowForge.
          </p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 rounded-full px-10 h-14 font-bold relative z-10">
            Create Your First Workflow
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, className }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all group ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}