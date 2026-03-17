import React, { useState, useEffect, useMemo } from 'react';
import { 
  Moon, 
  History, 
  Calculator, 
  AlertTriangle, 
  Copy, 
  User as UserIcon,
  Heart,
  ChevronRight,
  Sparkles,
  Eye,
  CheckCircle2,
  Lock,
  Check,
  ShieldCheck,
  Trash2,
  Save,
  MessageSquare,
  Zap,
  Book,
  PartyPopper,
  Home,
  Star,
  Settings,
  LogOut
} from 'lucide-react';

// --- Configuration ---
const ADMIN_USER = "zaidfahad";
const ADMIN_PASS = "zaid2026";

// Hardcoded Accounts for Zaid
const ACCOUNTS = [
  { id: 'bkash', name: 'bKash', number: '01627939394', color: '#d12053' },
  { id: 'rocket', name: 'Rocket', number: '016279393941', color: '#8c3494' },
  { id: 'pathao', name: 'Pathao Pay', number: '01627939394', color: '#ef2329' },
  { id: 'upay', name: 'Upay', number: '01627939394', color: '#ffc40c' }
];

const RELATIONSHIPS = [
  { id: 'sibling', label: 'বড় ভাই/আপু', base: 500 },
  { id: 'cousin', label: 'চাচাতো/ফুপাতো', base: 300 },
  { id: 'elder', label: 'মামা/চাচা/খালা', base: 600 },
  { id: 'senior', label: 'সিনিয়র (এলাকা/ভার্সিটি)', base: 400 },
  { id: 'colleague', label: 'অফিস কলিগ/সিনিয়র', base: 450 },
  { id: 'friend', label: 'বন্ধু (বড় ভাই তুল্য)', base: 250 },
  { id: 'mentor', label: 'মেন্টর/শিক্ষক', base: 800 },
  { id: 'neighbor', label: 'প্রতিবেশী মুরুব্বি', base: 150 }
];

const BOND_LEVELS = [
  { id: 'formal', label: 'মোটামুটি', mult: 0.5 },
  { id: 'normal', label: 'স্বাভাবিক', mult: 1.0 },
  { id: 'close', label: 'অনেক ক্লোজ', mult: 1.5 }
];

const SPECIAL_PERKS = [
  { id: 'first_wish', label: 'সবার আগে উইশ', bonus: 150 },
  { id: 'namaj', label: 'একসাথে নামাজ', bonus: 200 },
  { id: 'henna', label: 'হাতে নাম লিখা', bonus: 100 },
  { id: 'roast', label: 'ফানি রোস্ট', bonus: 50 }
];

const HADITHS = [
  { text: "যে ব্যক্তি চায় তার রিযিক বৃদ্ধি হোক এবং আয়ু বাড়ুক, সে যেন আত্মীয়তার সম্পর্ক বজায় রাখে।", source: "সহীহ বুখারী ৫৯৮৬" },
  { text: "একে অপরকে উপহার দাও, তোমাদের মধ্যে ভালোবাসা বৃদ্ধি পাবে।", source: "আল-আদাব আল-মুফরাদ ৫৯৪" },
  { text: "যে আমাদের ছোটদের স্নেহ করে না এবং বড়দের সম্মান করে না, সে আমাদের দলভুক্ত নয়।", source: "সুনান তিরমিজি ১৯১৯" }
];

const PAYMENT_LOGOS = {
  bkash: (
    <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current">
      <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm22.4 75.3H27.6V24.7h44.8v50.6zM34.7 32.1v35.8h30.6V32.1H34.7z"/>
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current">
      <path d="M50 5L15 85h15l5-12h30l5 12h15L50 5zm0 18l12 28H38l12-28z"/>
    </svg>
  ),
  pathao: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22V12" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12L3 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  upay: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3">
      <circle cx="12" cy="8" r="5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 21a5 5 0 0110 0" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

// --- Sub-Components ---

const Button = ({ children, onClick, className = "", variant = "primary", size = "md", type = "button" }) => {
  const base = "rounded-sm font-black transition-all flex items-center justify-center gap-1 active:translate-y-1 active:shadow-none uppercase tracking-tighter border-2 border-black";
  const sizes = { sm: "px-2 py-1 text-[10px]", md: "px-4 py-2 text-xs", lg: "px-6 py-3 text-sm" };
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
    secondary: "bg-white text-black hover:bg-zinc-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
    emerald: "bg-[#064e3b] text-[#fbbf24] hover:bg-[#065f46] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    gold: "bg-[#fbbf24] text-black hover:bg-[#f59e0b] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    danger: "bg-red-50 text-red-600 border-red-600"
  };
  return <button type={type} onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>{children}</button>;
};

const Card = ({ children, className = "", noPadding = false, variant = "default" }) => {
  const variants = {
    default: "bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
    emerald: "bg-[#064e3b] text-[#fbbf24] border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
    parchment: "bg-[#FDFCF8] border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
  };
  return <div className={`${variants[variant]} rounded-sm ${noPadding ? '' : 'p-4'} ${className}`}>{children}</div>;
};

const Chip = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-3 py-1.5 border-2 border-black text-[10px] font-black uppercase transition-all flex items-center gap-1 ${
      active ? 'bg-[#064e3b] text-white border-[#fbbf24] scale-105' : 'bg-white text-black border-black hover:bg-zinc-50'
    }`}
  >
    {active && <Sparkles size={10} className="text-[#fbbf24]" />}
    {label}
  </button>
);

// --- App Root ---

export default function App() {
  const [view, setView] = useState('public'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState(null);
  const [lastSubmission, setLastSubmission] = useState(null);

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('zaid_salami_v10_profile');
    if (saved) return JSON.parse(saved);
    return { name: 'Zaid Fahad', bio: 'বড়দের দোয়া ও সালামি দুইটাই কাম্য!' };
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('zaid_salami_v10_txs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem('zaid_salami_v10_profile', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('zaid_salami_v10_txs', JSON.stringify(transactions)); }, [transactions]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (fd.get('username') === ADMIN_USER && fd.get('password') === ADMIN_PASS) {
      setIsLoggedIn(true);
      setView('dashboard');
      showToast("অ্যাক্সেস সফল");
    } else {
      showToast("ভুল তথ্য দিয়েছেন");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans text-black pb-12 selection:bg-[#fbbf24] selection:text-black relative overflow-x-hidden">
      <nav className="border-b-4 border-black sticky top-0 bg-[#FDFCF8]/95 z-50 px-4 h-14 flex items-center justify-between shadow-sm">
        <button onClick={() => setView('public')} className="text-sm font-black tracking-tighter flex items-center gap-2 uppercase group">
          <div className="bg-[#064e3b] p-1.5 border-2 border-black rotate-2 group-hover:rotate-0 transition-transform">
            <Moon size={16} fill="#fbbf24" className="text-[#fbbf24]" />
          </div>
          <span>Zaid's Hub</span>
        </button>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <button onClick={() => setView('dashboard')} className="text-[10px] font-black uppercase bg-[#fbbf24] px-3 py-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">Dashboard</button>
          ) : (
            <button onClick={() => setView('login')} className="text-[10px] font-black uppercase underline decoration-4 decoration-[#fbbf24] underline-offset-4">Admin</button>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-6 relative z-10">
        {view === 'public' && (
          <PublicView 
            profile={profile} 
            onSalamiSubmit={(tx) => {
              setTransactions(prev => [tx, ...prev]);
              setLastSubmission(tx);
              setView('thanks');
            }} 
          />
        )}

        {view === 'thanks' && lastSubmission && (
          <div className="max-w-md mx-auto py-12 text-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="relative inline-block">
               <div className="p-10 bg-[#064e3b] rounded-full text-[#fbbf24] border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] ring-4 ring-[#fbbf24]/20">
                 <PartyPopper size={64} />
               </div>
               <div className="absolute -top-4 -right-4 bg-[#fbbf24] p-3 rounded-full border-2 border-black animate-bounce shadow-xl">
                 <Star size={24} fill="currentColor"/>
               </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl font-black uppercase tracking-tighter italic leading-none text-[#064e3b]">Eid Mubarak!</h2>
              <p className="text-lg font-bold text-zinc-800">৳{lastSubmission.amount} সালামি দেওয়ার জন্য ধন্যবাদ।</p>
              <p className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.3em]">যায়িদ শীঘ্রই এটি ভেরিফাই করবে।</p>
            </div>
            <div className="pt-4">
              <Button variant="emerald" onClick={() => setView('public')} className="w-full py-5 text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                 <Home size={20}/> হোম পেজে ফিরে যান
              </Button>
            </div>
          </div>
        )}

        {view === 'login' && (
          <div className="max-w-xs mx-auto mt-12 animate-in slide-in-from-top-4">
            <Card variant="emerald" className="p-8">
              <h2 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-center border-b-2 border-[#fbbf24] pb-2 text-[#fbbf24]">অ্যাডমিন লগইন</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <input name="username" placeholder="zaidfahad" className="w-full border-2 border-black p-3 text-xs font-bold bg-white text-black outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" required />
                <input name="password" type="password" placeholder="••••••••" className="w-full border-2 border-black p-3 text-xs font-bold bg-white text-black outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" required />
                <Button variant="gold" type="submit" className="w-full py-4 text-sm">ড্যাশবোর্ড খুলুন</Button>
              </form>
            </Card>
          </div>
        )}

        {view === 'dashboard' && isLoggedIn && (
          <Dashboard profile={profile} setProfile={setProfile} transactions={transactions} setTransactions={setTransactions} showToast={showToast} onLogout={() => { setIsLoggedIn(false); setView('public'); }} />
        )}
      </main>

      <footer className="fixed bottom-0 w-full bg-[#064e3b] text-[#fbbf24] border-t-4 border-black p-2 text-center text-[9px] font-black uppercase tracking-[0.4em] z-50">
        Dev: <span className="underline decoration-double underline-offset-4 font-black">Zaid Fahad</span>
      </footer>

      {toast && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 bg-[#064e3b] text-[#fbbf24] px-8 py-3 rounded-sm border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-black z-[100] text-[10px] uppercase tracking-widest text-center animate-in slide-in-from-bottom-8">
          {toast}
        </div>
      )}
    </div>
  );
}

const PublicView = ({ profile, onSalamiSubmit }) => {
  const [calc, setCalc] = useState({ relationId: 'sibling', bondId: 'normal', perks: [], custom: false, customVal: '' });
  const [selectedMethod, setSelectedMethod] = useState(null);
  
  const estimatedAmount = useMemo(() => {
    const rel = RELATIONSHIPS.find(r => r.id === calc.relationId);
    const bond = BOND_LEVELS.find(b => b.id === calc.bondId);
    let raw = (rel?.base || 0) * (bond?.mult || 1);
    calc.perks.forEach(pid => {
      const perk = SPECIAL_PERKS.find(p => p.id === pid);
      if(perk) raw += perk.bonus;
    });
    return Math.min(1500, Math.max(50, raw));
  }, [calc.relationId, calc.bondId, calc.perks]);

  const finalAmount = calc.custom ? Number(calc.customVal) || 0 : estimatedAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const tx = { id: Date.now(), senderName: fd.get('name'), note: fd.get('note'), amount: finalAmount, method: selectedMethod, txId: fd.get('txId'), status: 'pending', timestamp: new Date().toISOString() };
    if(!tx.senderName || !tx.txId || !selectedMethod || !tx.amount) return;
    onSalamiSubmit(tx);
  };

  const currentAccount = ACCOUNTS.find(a => a.id === selectedMethod);

  return (
    <div className="max-w-md mx-auto space-y-10 animate-in fade-in duration-1000 pb-20">
      <div className="relative text-center py-4">
        <p className="text-[12px] font-black uppercase tracking-[0.5em] text-[#064e3b] mb-1">Eid-ul-Fitr 2026</p>
        <h1 className="text-2xl font-black uppercase bg-[#064e3b] text-[#fbbf24] inline-block px-6 py-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">Eid Mubarak!</h1>
      </div>

      <div className="text-center space-y-4">
        <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-[#064e3b] border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] ring-4 ring-[#fbbf24]/30 relative">
          <UserIcon size={40} />
          <div className="absolute -bottom-2 -right-2 bg-[#fbbf24] p-1.5 border-2 border-black rotate-12"><Sparkles size={14} className="text-black" /></div>
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight text-[#064e3b] leading-none">{profile.name}</h2>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {HADITHS.map((h, i) => (
          <div key={i} className="bg-white border-2 border-black p-4 relative overflow-hidden group">
             <div className="absolute -right-4 -bottom-4 text-[#064e3b] opacity-[0.05] group-hover:scale-110 transition-transform"><Book size={60} /></div>
             <p className="text-[11px] font-bold leading-relaxed text-[#064e3b]">"{h.text}"</p>
             <p className="text-[8px] font-black uppercase text-zinc-400 mt-1 tracking-widest">— {h.source}</p>
          </div>
        ))}
      </div>

      <Card noPadding className="border-4 overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="p-4 bg-[#064e3b] text-[#fbbf24] flex justify-between items-center border-b-4 border-black">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2"><Calculator size={18}/> Salami Estimator</span>
        </div>
        <div className="p-5 space-y-8 bg-[#FDFCF8]">
          <div className="space-y-4">
            <p className="text-[9px] font-black text-[#064e3b] uppercase tracking-widest text-center">Relationship</p>
            <div className="flex flex-wrap justify-center gap-2">
              {RELATIONSHIPS.map(r => (
                <Chip key={r.id} label={r.label} active={calc.relationId === r.id && !calc.custom} onClick={() => setCalc({...calc, relationId: r.id, custom: false})} />
              ))}
              <Chip label="Custom" active={calc.custom} onClick={() => setCalc({...calc, custom: true})} />
            </div>
          </div>

          {!calc.custom ? (
            <div className="space-y-4">
              <p className="text-[9px] font-black text-[#064e3b] uppercase tracking-widest text-center">Bond Strength</p>
              <div className="flex justify-center gap-2">
                {BOND_LEVELS.map(b => (
                  <Chip key={b.id} label={b.label} active={calc.bondId === b.id} onClick={() => setCalc({...calc, bondId: b.id})} />
                ))}
              </div>
              <p className="text-[9px] font-black text-[#064e3b] uppercase tracking-widest text-center">Special Perks</p>
              <div className="flex flex-wrap justify-center gap-2">
                {SPECIAL_PERKS.map(p => (
                  <Chip key={p.id} label={`+ ${p.label}`} active={calc.perks.includes(p.id)} onClick={() => {
                    const newPerks = calc.perks.includes(p.id) ? calc.perks.filter(x => x !== p.id) : [...calc.perks, p.id];
                    setCalc({...calc, perks: newPerks});
                  }} />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-xs mx-auto animate-in fade-in slide-in-from-top-2">
              <p className="text-[9px] font-black text-[#064e3b] uppercase tracking-widest text-center">Enter Value (৳)</p>
              <input type="number" className="w-full border-4 border-black p-5 text-5xl font-black outline-none text-center bg-white" value={calc.customVal} onChange={e => setCalc({...calc, customVal: e.target.value})} />
            </div>
          )}

          <div className="pt-8 border-t-4 border-black border-dotted text-center relative">
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fbbf24] px-4 py-1 border-2 border-black text-[11px] font-black uppercase">Result</div>
             <p className="text-7xl font-black tracking-tighter text-[#064e3b]">৳{finalAmount}</p>
          </div>
        </div>
      </Card>

      <Card className="border-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
        <div className="bg-[#fbbf24] p-3 border-b-4 border-black flex items-center gap-2"><Zap size={18} fill="black" /><h3 className="text-[12px] font-black uppercase tracking-widest">Payment Verification</h3></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <input name="name" className="w-full border-2 border-black p-4 text-xs font-bold focus:bg-zinc-50 outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" placeholder="Payer Name" required />
          <textarea name="note" className="w-full border-2 border-black p-4 text-xs font-bold min-h-[100px] focus:bg-zinc-50 outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" placeholder="Salami Message..." />
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {ACCOUNTS.map(m => (
              <button key={m.id} type="button" onClick={() => setSelectedMethod(m.id)} className={`border-4 border-black p-3 flex flex-col items-center justify-center gap-2 transition-all relative ${selectedMethod === m.id ? 'bg-[#064e3b] text-white' : 'bg-white hover:bg-[#FDFCF8]'}`}>
                {selectedMethod === m.id && <div className="absolute -top-2 -right-2 bg-[#fbbf24] p-1 border-2 border-black animate-bounce"><Check size={10} className="text-black"/></div>}
                <div style={{ color: selectedMethod === m.id ? '#fbbf24' : m.color }}>{PAYMENT_LOGOS[m.id]}</div>
                <span className="text-[8px] font-black uppercase tracking-tighter">{m.name}</span>
              </button>
            ))}
          </div>

          {selectedMethod && (
            <div className="p-6 bg-[#f0f9f1] border-4 border-[#064e3b] border-dotted animate-in slide-in-from-top-4">
               <p className="text-[10px] font-black text-[#064e3b] uppercase tracking-widest mb-4">Target Credentials</p>
               <div className="bg-white border-2 border-black p-5 relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <div className="absolute left-0 top-0 h-full w-3 bg-[#fbbf24]"></div>
                  <span className="text-[10px] font-black uppercase text-zinc-400 block mb-1">{selectedMethod} No.</span>
                  <span className="text-2xl font-black font-mono select-all tracking-widest text-[#064e3b] break-all leading-tight">{currentAccount.number}</span>
               </div>
            </div>
          )}

          <input name="txId" className="w-full border-2 border-black p-4 text-sm font-mono font-black focus:bg-zinc-50 outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" placeholder="Transaction ID (TxID)" required />
          <Button type="submit" size="lg" className="w-full py-6 text-xl border-4 bg-[#064e3b] text-[#fbbf24] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]" disabled={!selectedMethod}>Confirm <CheckCircle2 size={24}/></Button>
        </form>
      </Card>
    </div>
  );
};

const Dashboard = ({ transactions, setTransactions, showToast, onLogout }) => {
  const stats = useMemo(() => ({ verified: transactions.filter(t => t.status === 'confirmed').reduce((a,c) => a+c.amount, 0), pending: transactions.filter(t => t.status === 'pending').reduce((a,c) => a+c.amount, 0), total: transactions.length }), [transactions]);
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="emerald" className="border-4 text-center"><p className="text-[9px] font-black uppercase opacity-60">Verified</p><p className="text-3xl font-black">৳{stats.verified}</p></Card>
        <Card className="border-4 text-center"><p className="text-[9px] font-black uppercase opacity-60">Pending</p><p className="text-3xl font-black">৳{stats.pending}</p></Card>
        <Card className="col-span-2 flex items-center justify-between border-4 bg-zinc-50 border-dashed px-6">
          <p className="text-[10px] font-black uppercase">Control Panel</p>
          <Button size="sm" variant="danger" onClick={onLogout}><LogOut size={16}/> Exit</Button>
        </Card>
      </div>
      <Card noPadding className="overflow-hidden border-4">
        <div className="p-5 border-b-4 border-black flex justify-between items-center bg-[#FDFCF8]"><h3 className="text-xs font-black uppercase tracking-[0.3em]">Historical Ledger</h3><span className="text-[10px] font-black bg-black text-white px-3 py-1.5 uppercase">{stats.total} entries</span></div>
        <div className="divide-y-4 divide-black">
          {transactions.map(tx => (
            <div key={tx.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-zinc-50 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center gap-4"><p className="text-lg font-black uppercase tracking-tight leading-none">{tx.senderName}</p><span className={`text-[9px] font-black px-2.5 py-1 border-2 uppercase rounded-full ${tx.status === 'confirmed' ? 'bg-[#f0f9f1] border-[#064e3b] text-[#064e3b]' : 'bg-yellow-100 border-yellow-800 text-yellow-800 animate-pulse'}`}>{tx.status}</span></div>
                {tx.note && <div className="bg-white border-2 border-black/10 p-3 italic text-[11px] font-bold text-zinc-500">"{tx.note}"</div>}
                <div className="flex gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-widest border border-zinc-200 px-1 inline-block">{tx.method} • {tx.txId}</div>
              </div>
              <div className="flex items-center gap-6"><p className="text-3xl font-black text-[#064e3b]">৳{tx.amount}</p><div className="flex gap-2">{tx.status === 'pending' && <button onClick={() => { setTransactions(prev => prev.map(t => t.id === tx.id ? {...t, status: 'confirmed'} : t)); showToast("Verified"); }} className="p-3 border-4 border-black bg-[#f0f9f1] hover:bg-[#064e3b] hover:text-white transition-colors"><Check size={20}/></button>}<button onClick={() => setTransactions(prev => prev.filter(t => t.id !== tx.id))} className="p-3 border-4 border-black bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"><Trash2 size={20}/></button></div></div>
            </div>
          ))}
          {transactions.length === 0 && <div className="py-24 text-center opacity-20"><Heart size={48} className="mx-auto"/><p className="text-[10px] font-black uppercase mt-2 tracking-widest">The ledger is empty</p></div>}
        </div>
      </Card>
    </div>
  );
};

