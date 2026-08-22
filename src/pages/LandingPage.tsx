import { useState, useRef, useEffect, type ReactNode } from 'react';
import {
  Sparkles, ArrowRight, Star, ShieldCheck, Zap, Globe, CheckCircle2,
  FileText, Wand2, Languages,
  ScanLine, Play, ChevronRight, TrendingUp, Users, Lock, Cpu,
  Image, Volume2, Layers, Upload, Search, ChevronDown,
  ArrowUpRight, Monitor, Smartphone, Clock, RefreshCw,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { UploadZone, type UploadedFile } from '@/components/UploadZone';
import { categories, aiFeatures, tools } from '@/data/tools';

type Props = { navigate: (path: string) => void };

function getIcon(name: string): React.ComponentType<{ className?: string }> {
  const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  return Icon ?? Icons.FileText;
}

/* ─── Scroll-reveal helpers ─── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type Dir = 'up' | 'left' | 'right' | 'scale' | 'blur';
function Reveal({ children, delay = 0, dir = 'up', className = '' }: {
  children: ReactNode; delay?: number; dir?: Dir; className?: string;
}) {
  const { ref, inView } = useInView();
  const base: React.CSSProperties = {
    opacity: inView ? 1 : 0,
    transition: `all .8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
  };
  const transforms: Record<Dir, React.CSSProperties> = {
    up: { transform: inView ? 'translateY(0)' : 'translateY(40px)' },
    left: { transform: inView ? 'translateX(0)' : 'translateX(-50px)' },
    right: { transform: inView ? 'translateX(0)' : 'translateX(50px)' },
    scale: { transform: inView ? 'scale(1)' : 'scale(.9)' },
    blur: { transform: inView ? 'scale(1) translateY(0)' : 'scale(.95) translateY(20px)', filter: inView ? 'blur(0)' : 'blur(6px)' },
  };
  return <div ref={ref} className={className} style={{ ...base, ...transforms[dir] }}>{children}</div>;
}

/* ─── Static data ─── */
const heroTools = [
  { name: 'PDF to Word', desc: 'Convert instantly', icon: FileText, bg: 'bg-red-500' },
  { name: 'PDF to JPG', desc: 'Extract images', icon: Image, bg: 'bg-blue-500' },
  { name: 'Image Compress', desc: 'Reduce size 90%', icon: Zap, bg: 'bg-amber-500' },
  { name: 'Video Compress', desc: 'Shrink videos', icon: Play, bg: 'bg-purple-500' },
  { name: 'AI OCR', desc: 'Extract text', icon: ScanLine, bg: 'bg-teal-500' },
  { name: 'PDF Merge', desc: 'Combine files', icon: Layers, bg: 'bg-pink-500' },
];

const orbitTools = [
  { name: 'PDF → Word', icon: FileText, ring: 1, angle: 0 },
  { name: 'AI OCR', icon: ScanLine, ring: 1, angle: 90 },
  { name: 'Enhancer', icon: Wand2, ring: 1, angle: 180 },
  { name: 'Translate', icon: Languages, ring: 1, angle: 270 },
  { name: 'Video Compress', icon: Play, ring: 2, angle: 45 },
  { name: 'Audio Convert', icon: Volume2, ring: 2, angle: 135 },
  { name: 'PDF Merge', icon: Layers, ring: 2, angle: 225 },
  { name: 'Image Compress', icon: Zap, ring: 2, angle: 315 },
];

const howItWorks = [
  { step: '01', icon: Upload, title: 'Upload your file', desc: 'Drag & drop or browse. We support PDF, images, video, audio, and 50+ formats.' },
  { step: '02', icon: Search, title: 'Pick a tool', desc: 'Choose from 90+ conversion, enhancement, or AI-powered tools.' },
  { step: '03', icon: Cpu, title: 'AI processes it', desc: 'Our servers handle everything — OCR, upscaling, translation, compression — in seconds.' },
  { step: '04', icon: ArrowUpRight, title: 'Download result', desc: 'Get your polished file. Original quality guaranteed or your money back.' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'Product Manager, TechCorp', quote: 'QuadraConverter has saved our team hours every week. The AI OCR reads our scanned invoices perfectly, and the PDF-to-Word conversion is flawless.', initials: 'SC', color: 'from-rose-500 to-pink-600' },
  { name: 'Marcus Johnson', role: 'Freelance Designer', quote: 'The AI image enhancer is incredible. I upscaled client logos from 200px to 4K and they looked professionally redrawn. Game changer.', initials: 'MJ', color: 'from-blue-500 to-indigo-600' },
  { name: 'Priya Sharma', role: 'Research Scientist, MIT', quote: 'Chat with PDF changed how I review papers. I can ask questions about methodology, get summaries, and generate quizzes for my students instantly.', initials: 'PS', color: 'from-emerald-500 to-teal-600' },
];

const faqs = [
  { q: 'Is QuadraConverter AI free to use?', a: 'Yes! You get 5 free conversions per day on our free plan. For unlimited access and premium AI features, check out our Pro and Business plans starting at $9/month.' },
  { q: 'How secure are my uploaded files?', a: 'All files are encrypted with 256-bit SSL in transit and at rest. We never share your data with third parties, and files are automatically deleted from our servers within 2 hours of processing.' },
  { q: 'What file formats are supported?', a: 'We support 50+ formats including PDF, DOCX, JPG, PNG, WEBP, MP4, MP3, WAV, GIF, SVG, HEIC, TIFF, and many more. Our AI tools work with all major document and image formats.' },
  { q: 'How accurate is the AI OCR?', a: 'Our AI OCR achieves 99.2% accuracy across 40+ languages, including complex layouts with tables, columns, and mixed fonts. It outperforms traditional OCR by a significant margin.' },
  { q: 'Can I translate entire documents while keeping the layout?', a: 'Absolutely. Our AI Translation preserves the original document formatting, tables, images, and layout while translating the text into 45+ languages. It\'s like having a professional translator who also does desktop publishing.' },
  { q: 'Do you offer an API for developers?', a: 'Yes, we provide a RESTful API with comprehensive documentation, SDKs for Python, Node.js, and Java, and generous rate limits. Contact our sales team for enterprise API access.' },
];

const scanImg = 'https://images.pexels.com/photos/9301887/pexels-photo-9301887.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const videoImg = 'https://images.pexels.com/photos/11063289/pexels-photo-11063289.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const abstractImg = 'https://images.pexels.com/photos/29022333/pexels-photo-29022333.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

/* ═══════════════════════════════════════════════════════════════════ */
export function LandingPage({ navigate }: Props) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-x-hidden">
      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes hero-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes orbit-cw{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes orbit-ccw{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes pulse-glow{0%,100%{box-shadow:0 0 30px rgba(59,130,246,.3),0 0 80px rgba(59,130,246,.1)}50%{box-shadow:0 0 50px rgba(59,130,246,.5),0 0 120px rgba(59,130,246,.2)}}
        @keyframes orbit-ring-pulse{0%,100%{opacity:.15}50%{opacity:.3}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes count-up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .hero-float{animation:hero-float 6s ease-in-out infinite}
        .orbit-cw{animation:orbit-cw 40s linear infinite}
        .orbit-ccw{animation:orbit-ccw 55s linear infinite}
        .orbit-ccw-inner{animation:orbit-ccw 40s linear infinite}
        .orbit-cw-inner{animation:orbit-cw 55s linear infinite}
        .pulse-glow{animation:pulse-glow 3s ease-in-out infinite}
        .orbit-ring-vis{animation:orbit-ring-pulse 4s ease-in-out infinite}
        .marquee-track{animation:marquee 30s linear infinite}
        .shimmer-bg{background:linear-gradient(90deg,transparent 30%,rgba(255,255,255,.08) 50%,transparent 70%);background-size:200% 100%;animation:shimmer 3s linear infinite}
      `}</style>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute -top-32 left-1/4 h-96 w-[50rem] rounded-full bg-brand-200/30 blur-[100px]" />
        <div className="absolute -top-10 right-0 h-72 w-72 rounded-full bg-accent-200/25 blur-[80px]" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-purple-200/20 blur-[60px]" />

        <div className="container-page relative pt-12 pb-8 sm:pt-20">
          {/* Nav hint */}
          <Reveal delay={0}>
            <nav className="flex items-center justify-between mb-12 sm:mb-16">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white font-bold text-sm shadow-soft">Q</span>
                <span className="font-display text-lg font-bold text-ink-900">QuadraConverter <span className="text-brand-600">AI</span></span>
              </div>
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-ink-600">
                <button onClick={() => navigate('/tools')} className="hover:text-brand-600 transition-colors">Tools</button>
                <button onClick={() => navigate('/ai/ai-ocr')} className="hover:text-brand-600 transition-colors">AI Features</button>
                <button onClick={() => navigate('/pricing')} className="hover:text-brand-600 transition-colors">Pricing</button>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/tools')} className="btn-ghost text-sm hidden sm:inline-flex">Sign in</button>
                <button onClick={() => navigate('/tools')} className="btn-primary text-sm">Get Started Free</button>
              </div>
            </nav>
          </Reveal>

          {/* Hero content — split layout matching image */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — text */}
            <div>
              <Reveal delay={80}>
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {[
                    { icon: Zap, label: '90+ Tools', bg: 'bg-brand-50 text-brand-700 ring-brand-200' },
                    { icon: Cpu, label: 'AI Powered', bg: 'bg-purple-50 text-purple-700 ring-purple-200' },
                    { icon: ShieldCheck, label: '100% Secure', bg: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
                  ].map(({ icon: Ic, label, bg }) => (
                    <span key={label} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${bg}`}>
                      <Ic className="h-3.5 w-3.5" /> {label}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={160}>
                <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
                  Convert. Optimize.
                  <br />
                  Achieve More
                  <br />
                  <span className="gradient-text">with AI.</span>
                </h1>
              </Reveal>

              <Reveal delay={240}>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-500">
                  The all-in-one platform for documents, images, video, and audio — with AI OCR, enhancement, translation, and smart automation built right in.
                </p>
              </Reveal>

              <Reveal delay={320}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button onClick={() => navigate('/tools')} className="btn-primary text-base px-6 py-3">
                    Start Free <ArrowRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => navigate('/tools')} className="btn-ghost text-base px-6 py-3 ring-1 ring-ink-200">
                    View All Tools
                  </button>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['bg-brand-500', 'bg-amber-500', 'bg-emerald-500', 'bg-rose-500', 'bg-purple-500'].map((c, i) => (
                      <span key={i} className={`grid h-8 w-8 place-items-center rounded-full ${c} text-[10px] font-bold text-white ring-2 ring-white`}>
                        {['SC', 'MJ', 'PK', 'AL', 'DR'][i]}
                      </span>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-warn-400 text-warn-400" />
                      ))}
                    </div>
                    <p className="text-xs text-ink-500">Loved by <strong className="text-ink-700">120,000+</strong> users</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — mock app interface */}
            <Reveal delay={300} dir="right">
              <div className="hero-float relative">
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand-200/40 via-purple-200/30 to-accent-200/30 blur-2xl" />
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-float ring-1 ring-ink-200">
                  {/* App header */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-ink-100 bg-ink-50/60">
                    <div className="flex gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-err-400" />
                      <span className="h-3 w-3 rounded-full bg-warn-400" />
                      <span className="h-3 w-3 rounded-full bg-accent-400" />
                    </div>
                    <div className="flex-1 flex items-center gap-2 rounded-lg bg-ink-100 px-3 py-1.5">
                      <Search className="h-3.5 w-3.5 text-ink-400" />
                      <span className="text-xs text-ink-400">Search 90+ tools...</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-ink-400">
                      <Monitor className="h-3.5 w-3.5" />
                      <Smartphone className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  {/* Tool grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-4">
                    {heroTools.map((t) => (
                      <div key={t.name} className="group/tool flex items-center gap-2.5 rounded-xl bg-ink-50/80 p-3 ring-1 ring-ink-100 hover:ring-brand-300 hover:bg-brand-50/50 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:shadow-soft">
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${t.bg} text-white shadow-sm transition-transform duration-300 group-hover/tool:scale-110`}>
                          <t.icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-ink-800 truncate">{t.name}</p>
                          <p className="text-[9px] text-ink-400">{t.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Bottom bar */}
                  <div className="border-t border-ink-100 px-4 py-2.5 flex items-center justify-between bg-ink-50/40">
                    <span className="text-[10px] text-ink-400">Showing 6 of 90+ tools</span>
                    <button onClick={() => navigate('/tools')} className="text-[10px] font-semibold text-brand-600 hover:text-brand-700 transition-colors flex items-center gap-0.5">
                      View all <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Upload zone below hero */}
          <Reveal delay={500} className="mt-14">
            <UploadZone files={files} onFiles={setFiles} />
            {files.length > 0 && (
              <div className="mt-5 flex justify-center">
                <button onClick={() => navigate('/tools')} className="btn-primary">
                  Continue to tools <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ STATS BAR ═══════════════════ */}
      <section className="relative border-y border-ink-200/60 bg-white/80 backdrop-blur-sm py-10">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, value: '120K+', label: 'Happy Users', color: 'text-brand-500' },
              { icon: FileText, value: '10M+', label: 'Files Converted', color: 'text-purple-500' },
              { icon: TrendingUp, value: '99.2%', label: 'OCR Accuracy', color: 'text-emerald-500' },
              { icon: Cpu, value: '90+', label: 'AI Tools', color: 'text-amber-500' },
            ].map(({ icon: Icon, value, label, color }, i) => (
              <Reveal key={label} delay={i * 80}>
                <div className="text-center group">
                  <Icon className={`mx-auto h-6 w-6 ${color} transition-transform duration-300 group-hover:scale-110`} />
                  <p className="mt-2 font-display text-3xl font-extrabold text-ink-900">{value}</p>
                  <p className="text-sm text-ink-500">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUST MARQUEE ═══════════════════ */}
      <section className="py-8 border-b border-ink-100 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="marquee-track flex items-center gap-10 text-ink-300">
            {[ShieldCheck, Zap, Globe, Lock, Clock, RefreshCw, Monitor, Smartphone, ShieldCheck, Zap, Globe, Lock, Clock, RefreshCw, Monitor, Smartphone].map((Ic, i) => (
              <span key={i} className="flex items-center gap-2 text-sm font-medium">
                <Ic className="h-4 w-4" />
                {['256-bit encryption', 'Lightning fast', 'Works in browser', 'Auto-delete files', 'Processing 24/7', 'Batch conversion', 'Desktop & mobile', 'No installation'][i % 8]}
              </span>
            ))}
          </div>
          <div className="marquee-track flex items-center gap-10 text-ink-300" aria-hidden>
            {[ShieldCheck, Zap, Globe, Lock, Clock, RefreshCw, Monitor, Smartphone, ShieldCheck, Zap, Globe, Lock, Clock, RefreshCw, Monitor, Smartphone].map((Ic, i) => (
              <span key={i} className="flex items-center gap-2 text-sm font-medium">
                <Ic className="h-4 w-4" />
                {['256-bit encryption', 'Lightning fast', 'Works in browser', 'Auto-delete files', 'Processing 24/7', 'Batch conversion', 'Desktop & mobile', 'No installation'][i % 8]}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ ORBIT CARDS ═══════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink-900 via-ink-900 to-ink-800 py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-white/10 orbit-ring-vis" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full border border-white/10 orbit-ring-vis" style={{ animationDelay: '2s' }} />
        </div>

        <Reveal dir="blur" className="container-page relative">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-brand-300 ring-1 ring-white/10 mb-6">
              <Sparkles className="h-3.5 w-3.5" /> Powering your workflow
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Every tool you need,<br />orbiting around <span className="text-brand-400">one AI brain</span>
            </h2>
            <p className="mt-4 text-ink-400">From conversion to enhancement to translation — all connected, all intelligent.</p>
          </div>

          {/* Orbit container */}
          <div className="relative mx-auto h-[500px] w-full max-w-[700px] hidden lg:block">
            {/* Center orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 pulse-glow">
                <Cpu className="h-9 w-9 text-white" />
              </div>
            </div>

            {/* Inner ring (radius ~150px) — clockwise */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-0 w-0 orbit-cw">
              {orbitTools.filter(t => t.ring === 1).map((t) => {
                const Ic = t.icon;
                return (
                  <div key={t.name} className="absolute top-0 left-0" style={{ transform: `rotate(${t.angle}deg) translateX(155px)` }}>
                    <div className="orbit-ccw-inner">
                      <div className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md px-4 py-2.5 ring-1 ring-white/20 hover:bg-white/20 hover:ring-white/40 transition-all duration-300 cursor-pointer whitespace-nowrap">
                        <Ic className="h-4 w-4 text-brand-300" />
                        <span className="text-xs font-semibold text-white">{t.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Outer ring (radius ~270px) — counter-clockwise */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-0 w-0 orbit-ccw">
              {orbitTools.filter(t => t.ring === 2).map((t) => {
                const Ic = t.icon;
                return (
                  <div key={t.name} className="absolute top-0 left-0" style={{ transform: `rotate(${t.angle}deg) translateX(275px)` }}>
                    <div className="orbit-cw-inner">
                      <div className="flex items-center gap-2 rounded-xl bg-white/[0.07] backdrop-blur-md px-4 py-2.5 ring-1 ring-white/15 hover:bg-white/15 hover:ring-white/30 transition-all duration-300 cursor-pointer whitespace-nowrap">
                        <Ic className="h-4 w-4 text-white/70" />
                        <span className="text-xs font-medium text-white/80">{t.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile fallback — static grid */}
          <div className="lg:hidden grid grid-cols-2 gap-3 max-w-md mx-auto">
            {orbitTools.map((t) => {
              const Ic = t.icon;
              return (
                <div key={t.name} className="flex items-center gap-2.5 rounded-xl bg-white/10 backdrop-blur-sm px-4 py-3 ring-1 ring-white/15">
                  <Ic className="h-4 w-4 text-brand-300 shrink-0" />
                  <span className="text-xs font-semibold text-white">{t.name}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════ TOOL CATEGORIES ═══════════════════ */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">Explore tool categories</h2>
              <p className="mt-2 text-ink-500">Nine categories, 90+ tools — find exactly what you need.</p>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <button onClick={() => navigate('/tools')} className="hidden btn-ghost sm:inline-flex">
              View all <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = getIcon(cat.icon);
            const catTools = tools.filter((t) => t.category === cat.id).slice(0, 4);
            const catCount = tools.filter((t) => t.category === cat.id).length;
            return (
              <Reveal key={cat.id} delay={i * 60}>
                <button
                  onClick={() => navigate(`/tools/${cat.id}`)}
                  className="card-hover group relative overflow-hidden p-5 text-left w-full"
                >
                  <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${cat.color} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`} />
                  <div className="flex items-center gap-3">
                    <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${cat.color} shadow-soft transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-ink-900">{cat.name}</h3>
                      <p className="text-xs text-ink-400">{catCount} tools</p>
                    </div>
                    <ChevronRight className="ml-auto h-4 w-4 text-ink-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-500" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {catTools.map((t) => (
                      <span key={t.id} className="rounded-md bg-ink-50 px-2 py-1 text-xs font-medium text-ink-600 ring-1 ring-ink-100">
                        {t.name}
                      </span>
                    ))}
                    {catCount > 4 && (
                      <span className="rounded-md bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-600">
                        +{catCount - 4} more
                      </span>
                    )}
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════ AI FEATURES ═══════════════════ */}
      <section className="relative overflow-hidden bg-ink-50/50 py-20">
        <div className="absolute inset-0 dotted-bg opacity-40" />
        <div className="container-page relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="section-eyebrow">
              <Sparkles className="h-3.5 w-3.5" /> AI Exclusive Features
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              AI that does the boring parts for you
            </h2>
            <p className="mt-3 text-ink-500">
              From OCR to translation to invoice reading — QuadraConverter AI handles the work that used to take hours.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {aiFeatures.map((f, i) => {
              const Icon = getIcon(f.icon);
              return (
                <Reveal key={f.id} delay={i * 60}>
                  <button
                    onClick={() => navigate(`/ai/${f.id}`)}
                    className="card-hover group relative overflow-hidden p-6 text-left w-full h-full"
                  >
                    <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${f.accent} opacity-10 blur-2xl transition-opacity group-hover:opacity-25`} />
                    <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${f.accent} text-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      Try it now <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="container-page py-20">
        <Reveal className="mx-auto max-w-2xl text-center mb-16">
          <div className="section-eyebrow"><Clock className="h-3.5 w-3.5" /> How it works</div>
          <h2 className="mt-5 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Four steps. That&apos;s it.</h2>
          <p className="mt-3 text-ink-500">No sign-up required for your first 5 conversions. Just upload and go.</p>
        </Reveal>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s, i) => (
              <Reveal key={s.step} delay={i * 120}>
                <div className="relative text-center group">
                  <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white ring-1 ring-ink-200 shadow-soft transition-all duration-300 group-hover:shadow-float group-hover:ring-brand-300 group-hover:-translate-y-1 z-10">
                    <s.icon className="h-6 w-6 text-brand-600" />
                    <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white">{s.step}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CHAT WITH PDF ═══════════════════ */}
      <section className="bg-ink-50/50 py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal dir="left">
            <div className="section-eyebrow"><Sparkles className="h-3.5 w-3.5" /> Featured</div>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              Chat with any PDF like it&apos;s a colleague
            </h2>
            <p className="mt-4 text-ink-500">
              Upload a research paper, contract, or textbook and ask anything. Get summaries, page references, key findings, and generated quizzes — all grounded in the actual document.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Summarize page 10 in three bullets',
                'What are the key findings?',
                'Generate a 5-question quiz from chapter 2',
                'Find the most important topics',
              ].map((q) => (
                <li key={q} className="flex items-start gap-3 text-sm text-ink-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                  {q}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/ai/chat-pdf')} className="btn-primary mt-8">
              <FileText className="h-4 w-4" /> Open Chat with PDF
            </button>
          </Reveal>

          <Reveal dir="right" delay={150}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-200/40 to-accent-200/30 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-float ring-1 ring-ink-200">
                <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50/60 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-err-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-warn-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-accent-400" />
                  </div>
                  <span className="ml-2 text-xs font-medium text-ink-400">Research.pdf — Chat</span>
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex justify-end">
                    <span className="max-w-[80%] rounded-2xl rounded-tr-sm bg-brand-600 px-3.5 py-2.5 text-sm text-white">Summarize page 10</span>
                  </div>
                  <div className="flex justify-start">
                    <span className="max-w-[85%] rounded-2xl rounded-tl-sm bg-ink-100 px-3.5 py-2.5 text-sm text-ink-800">
                      Page 10 covers the methodology: a double-blind study with 240 participants over 12 weeks. Key result — the treatment group showed a 34% improvement (p&lt;0.01) with no significant side effects.
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <span className="max-w-[80%] rounded-2xl rounded-tr-sm bg-brand-600 px-3.5 py-2.5 text-sm text-white">Generate a quiz from this</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
                    AI is generating 5 questions…
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ SCANNER & ENHANCER ═══════════════════ */}
      <section className="container-page py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal delay={0}>
            <div className="card group relative overflow-hidden p-6 h-full">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl transition-opacity group-hover:opacity-150" />
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-soft">
                  <ScanLine className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-bold text-ink-900">AI Scanner</h3>
              </div>
              <p className="mt-3 text-sm text-ink-500">Upload a photo of any document. AI detects edges, removes shadows, brightens, crops, and exports a crisp PDF.</p>
              <div className="mt-5 overflow-hidden rounded-xl ring-1 ring-ink-200">
                <img src={scanImg} alt="Document scanning" className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {['Detects edges', 'Removes shadows', 'Brightens', 'Crops & PDF'].map((s) => (
                  <span key={s} className="flex items-center gap-1.5 text-ink-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-500" /> {s}
                  </span>
                ))}
              </div>
              <button onClick={() => navigate('/ai/ai-scanner')} className="btn-secondary mt-5 w-full">
                Try AI Scanner <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card group relative overflow-hidden p-6 h-full">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-fuchsia-400/20 blur-3xl transition-opacity group-hover:opacity-150" />
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow-soft">
                  <Wand2 className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-bold text-ink-900">AI Image Enhancer</h3>
              </div>
              <p className="mt-3 text-sm text-ink-500">Upscale low-quality photos to HD, 4K, and 8K while reconstructing fine detail.</p>
              <div className="mt-5 overflow-hidden rounded-xl ring-1 ring-ink-200">
                <img src={abstractImg} alt="AI enhancement" className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                {['Low', 'HD', '4K', '8K'].map((q, i) => (
                  <span key={q} className={`rounded-md px-2.5 py-1 transition-all duration-300 ${i === 3 ? 'bg-brand-600 text-white scale-105' : 'bg-ink-100 text-ink-600'}`}>{q}</span>
                ))}
              </div>
              <button onClick={() => navigate('/ai/ai-enhancer')} className="btn-secondary mt-5 w-full">
                Try AI Enhancer <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ AI TRANSLATION ═══════════════════ */}
      <section className="bg-ink-50/50 py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <Reveal dir="left" delay={100} className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-sky-200/40 to-brand-200/30 blur-2xl" />
              <div className="relative space-y-3">
                <div className="card p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink-400">Source — English</span>
                    <Languages className="h-4 w-4 text-brand-500" />
                  </div>
                  <p className="mt-2 text-sm text-ink-700">The quarterly report shows a 23% increase in revenue, driven primarily by international sales growth.</p>
                </div>
                <div className="flex justify-center">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-brand-600">
                    <ArrowRight className="h-4 w-4 rotate-90" />
                  </div>
                </div>
                <div className="card border-brand-200 p-4 ring-brand-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">Translated — Japanese</span>
                    <CheckCircle2 className="h-4 w-4 text-accent-500" />
                  </div>
                  <p className="mt-2 text-sm text-ink-700">四半期報告書は、主に国際的な売上成長によって推進され、収益が23%増加したことを示しています。</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['English', 'Tamil', 'Hindi', 'French', 'Japanese', '+40 more'].map((l) => (
                    <span key={l} className="chip">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal dir="right" className="order-1 lg:order-2">
            <div className="section-eyebrow"><Languages className="h-3.5 w-3.5" /> AI Translation</div>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              Translate documents without breaking the layout
            </h2>
            <p className="mt-4 text-ink-500">
              Upload a PDF in English and get it back in Tamil, Hindi, French, Japanese, or 40+ other languages — formatting, tables, and images all preserved.
            </p>
            <button onClick={() => navigate('/ai/ai-translation')} className="btn-primary mt-8">
              <Languages className="h-4 w-4" /> Try AI Translation
            </button>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ VIDEO TOOLS ═══════════════════ */}
      <section className="container-page py-20">
        <Reveal>
          <div className="card relative overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="relative min-h-[280px] overflow-hidden">
                <img src={videoImg} alt="Video editing" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-900/50 to-transparent" />
                <button
                  onClick={() => navigate('/tools/video')}
                  className="group absolute inset-0 grid place-items-center"
                >
                  <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white/90 shadow-float transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 h-7 w-7 fill-brand-600 text-brand-600" />
                    <span className="absolute inset-0 rounded-full bg-white/60 animate-ping opacity-20" />
                  </span>
                </button>
              </div>
              <div className="p-8 lg:p-10">
                <div className="section-eyebrow"><Play className="h-3.5 w-3.5" /> Video & Audio</div>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                  Compress, convert, trim, and caption — all in the browser
                </h2>
                <p className="mt-3 text-ink-500">
                  From MP4 to MP3, video to GIF, AI subtitle generation, noise removal, and podcast cleanup — your full media toolkit.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Video Compressor', 'MP4 → MP3', 'Video → GIF', 'Trim Video', 'AI Captions', 'Noise Removal'].map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
                <button onClick={() => navigate('/tools/video')} className="btn-primary mt-7">
                  Explore media tools <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="relative overflow-hidden bg-ink-50/50 py-20">
        <div className="absolute inset-0 dotted-bg opacity-30" />
        <div className="container-page relative">
          <Reveal className="mx-auto max-w-2xl text-center mb-14">
            <div className="section-eyebrow"><Star className="h-3.5 w-3.5" /> Testimonials</div>
            <h2 className="mt-5 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Trusted by professionals worldwide</h2>
            <p className="mt-3 text-ink-500">See what our users have to say about their experience.</p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="card group relative overflow-hidden p-6 h-full flex flex-col">
                  <div className="shimmer-bg absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-warn-400 text-warn-400" />
                    ))}
                  </div>
                  <p className="relative text-sm leading-relaxed text-ink-600 flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="relative mt-5 flex items-center gap-3 pt-5 border-t border-ink-100">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br ${t.color} text-xs font-bold text-white`}>
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                      <p className="text-xs text-ink-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="container-page py-20">
        <Reveal className="mx-auto max-w-2xl text-center mb-14">
          <div className="section-eyebrow"><HelpCircle className="h-3.5 w-3.5" /> FAQ</div>
          <h2 className="mt-5 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Frequently asked questions</h2>
          <p className="mt-3 text-ink-500">Everything you need to know about QuadraConverter AI.</p>
        </Reveal>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="card overflow-hidden !p-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-ink-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-ink-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="px-6 pb-5 text-sm leading-relaxed text-ink-500">{faq.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════ PRICING TEASER ═══════════════════ */}
      <section className="bg-ink-50/50 py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl">Simple, transparent pricing</h2>
            <p className="mt-3 text-ink-500">Start free. Upgrade when you need more power.</p>
          </Reveal>

          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
            {[
              { name: 'Free', price: '$0', period: 'forever', features: ['5 conversions/day', 'Basic tools', 'Max 25MB per file', 'Community support'], cta: 'Get Started', highlight: false },
              { name: 'Pro', price: '$9', period: '/month', features: ['Unlimited conversions', 'All 90+ tools', 'Max 500MB per file', 'AI features included', 'Priority support', 'Batch processing'], cta: 'Go Pro', highlight: true },
              { name: 'Business', price: '$29', period: '/month', features: ['Everything in Pro', 'API access', 'Max 2GB per file', 'Team collaboration', 'Custom branding', 'Dedicated support'], cta: 'Contact Sales', highlight: false },
            ].map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100}>
                <div className={`relative overflow-hidden rounded-2xl p-6 h-full flex flex-col ${plan.highlight ? 'bg-gradient-to-b from-brand-600 to-brand-700 text-white ring-0 shadow-float scale-[1.02]' : 'card'}`}>
                  {plan.highlight && <div className="absolute top-0 right-0 rounded-bl-xl bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Popular</div>}
                  <h3 className={`font-display text-lg font-bold ${plan.highlight ? 'text-white' : 'text-ink-900'}`}>{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className={`font-display text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-ink-900'}`}>{plan.price}</span>
                    <span className={`text-sm ${plan.highlight ? 'text-brand-200' : 'text-ink-400'}`}>{plan.period}</span>
                  </div>
                  <ul className="mt-6 space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 ${plan.highlight ? 'text-brand-200' : 'text-accent-500'}`} />
                        <span className={plan.highlight ? 'text-brand-50' : 'text-ink-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate('/pricing')}
                    className={`mt-6 w-full btn ${plan.highlight ? 'bg-white text-brand-700 hover:bg-brand-50' : 'btn-primary'}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section className="container-page pb-20">
        <Reveal dir="scale">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-600 to-accent-600 px-6 py-16 text-center sm:px-12 sm:py-24">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full border border-white/10 orbit-ring-vis" />
            <div className="relative">
              <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl leading-tight">
                Ready to convert<br />smarter?
              </h2>
              <p className="mx-auto mt-5 max-w-md text-lg text-brand-100">
                Join 120,000+ users who convert, enhance, and automate with QuadraConverter AI.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <button onClick={() => navigate('/tools')} className="btn bg-white text-brand-700 hover:bg-brand-50 text-base px-8 py-3.5 shadow-float">
                  Start free <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => navigate('/pricing')} className="btn bg-brand-700/40 text-white ring-1 ring-white/30 hover:bg-brand-700/60 text-base px-8 py-3.5">
                  View pricing
                </button>
              </div>
              <p className="mt-6 text-sm text-brand-200">No credit card required · 5 free conversions per day · Cancel anytime</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="border-t border-ink-200 bg-white py-12">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white font-bold text-xs shadow-soft">Q</span>
                <span className="font-display text-base font-bold text-ink-900">QuadraConverter <span className="text-brand-600">AI</span></span>
              </div>
              <p className="text-sm text-ink-500 leading-relaxed">The all-in-one AI-powered file conversion, enhancement, and automation platform.</p>
              <div className="mt-4 flex items-center gap-2">
                {[
                  { icon: ShieldCheck, text: '256-bit SSL' },
                  { icon: Lock, text: 'GDPR compliant' },
                ].map(({ icon: Ic, text }) => (
                  <span key={text} className="flex items-center gap-1 text-[11px] text-ink-400">
                    <Ic className="h-3 w-3" /> {text}
                  </span>
                ))}
              </div>
            </div>

            {[
              { title: 'Tools', links: [['PDF Tools', '/tools/pdf'], ['Image Tools', '/tools/image'], ['Video Tools', '/tools/video'], ['Audio Tools', '/tools/audio']] },
              { title: 'AI Features', links: [['AI OCR', '/ai/ai-ocr'], ['Chat with PDF', '/ai/chat-pdf'], ['AI Translation', '/ai/ai-translation'], ['AI Enhancer', '/ai/ai-enhancer']] },
              { title: 'Company', links: [['About', '/about'], ['Pricing', '/pricing'], ['Blog', '/blog'], ['Contact', '/contact']] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-bold text-ink-900 mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(([label, path]) => (
                    <li key={label}>
                      <button onClick={() => navigate(path as string)} className="text-sm text-ink-500 hover:text-brand-600 transition-colors">{label}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-ink-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-ink-400">© {new Date().getFullYear()} QuadraConverter AI. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-ink-400">
              <button onClick={() => navigate('/privacy')} className="hover:text-ink-600 transition-colors">Privacy Policy</button>
              <button onClick={() => navigate('/terms')} className="hover:text-ink-600 transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* small helper so the FAQ section doesn't break — HelpCircle is used above */
function HelpCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}
