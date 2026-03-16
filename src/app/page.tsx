"use client"

import Link from "next/link";
import { 
  ArrowRight, 
  Workflow, 
  Zap, 
  ShieldCheck, 
  Terminal, 
  GitBranchPlus,
  Server
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-14 rounded-md flex items-center justify-center text-white">
            <img src={"../../logos/logo.svg"}></img>
          </div>
          <span className="text-xl font-bold tracking-tight">FlowForge</span>
        </div>

        <div className="hidden md:flex gap-6 font-medium text-slate-600">
          <Link href="#features" className="hover:text-indigo-600 transition">Features</Link>
          <Link href="#integrations" className="hover:text-indigo-600 transition">Integrations</Link>
          <Link  onClick={() => authClient.customer.portal()} href={''} className="hover:text-indigo-600 transition">Pricing</Link>
        </div>

        <div className="flex gap-4">
          {!session?.user ? (
            <Button variant={"outline"}>
              <Link href="/login">Sign In</Link>
            </Button>
          ) : (
            <Button variant={"outline"}
              className="hidden md:block px-4 py-2 font-medium text-slate-600 hover:text-indigo-600 transition"
               onClick={() => authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/login");
                  },
                },
              })}
            >
              Logout
            </Button>
          )}

          <Button 
            className="px-4 py-2 bg-orange-400 text-white rounded-lg font-medium hover:bg-orange-700 transition shadow-sm"
            onClick={() => router.push("/workflows")}
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-24 pb-20 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6">
          <Zap size={16} />
          <span>FlowForge 2.0 is now live</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
          Automate your workflows,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
            without the limits.
          </span>
        </h1>

        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The fair-code workflow automation tool that lets you connect anything to everything. Build complex automations with our visual node editor or write custom code.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-orange-400 text-white rounded-lg font-semibold text-lg hover:bg-orange-700 transition shadow-lg flex items-center gap-2">
            <Link href={"/workflows"}>Start free trial  </Link> <ArrowRight size={20} />
          </button>

          <button  className="px-8 py-4 bg-white shadow-amber-450 border border-slate-300 text-slate-700 rounded-lg font-semibold text-lg hover:bg-slate-50 transition flex items-center gap-2">
            See Billing 
          </button>
        </div>

       
      </section>
      <section id="integrations" className=" flex  items-center justify-center w-full p-4">
          <img width={1400} src="/logos/hero.png" alt="hero image"/>
        </section>
      {/* Features */}
      <section id="features" className="bg-white py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful features for developers</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Everything you need to build mission-critical automations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<GitBranchPlus className="text-indigo-600" size={28} />}
              title="Advanced branching"
              description="Route data based on complex logic and merge branches."
            />

            <FeatureCard
              icon={<Terminal className="text-indigo-600" size={28} />}
              title="Write custom JavaScript"
              description="Write raw JavaScript or Python when nodes aren't enough."
            />

            <FeatureCard
              icon={<ShieldCheck className="text-indigo-600" size={28} />}
              title="Secure & Self-hosted"
              description="Deploy on your infrastructure and keep data secure."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-orange-400 text-white text-center">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to stop doing manual work?</h2>
          <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of developers building scalable automations.
          </p>

          <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold text-lg hover:bg-slate-100 transition shadow-lg">
            Deploy your first workflow
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className=" text-slate-800 py-2 text-center">
        <p>© {new Date().getFullYear()} FlowForge Inc. This is a demo landing page.</p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition">
      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 border border-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}