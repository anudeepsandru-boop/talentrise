import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Lock, 
  Menu, 
  X, 
  Sparkles, 
  Briefcase, 
  Award, 
  GraduationCap, 
  UserCheck, 
  Gift, 
  Building2, 
  PhoneCall,
  HeartPulse
} from 'lucide-react';
import { openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME } from '../utils/whatsappHelper';

interface NavbarProps {
  onOpenAdmin: () => void;
  onSelectSectorFilter?: (sector: 'IT' | 'Non-IT' | 'Healthcare' | 'All') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onSelectSectorFilter }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'All Drives', href: '#drives', icon: Briefcase, onClick: () => onSelectSectorFilter && onSelectSectorFilter('All') },
    { name: 'IT & Engg', href: '#drives', icon: Sparkles, onClick: () => onSelectSectorFilter && onSelectSectorFilter('IT') },
    { name: 'Medical & RCM', href: '#medical', icon: HeartPulse, onClick: () => onSelectSectorFilter && onSelectSectorFilter('Healthcare') },
    { name: 'Mock Prep', href: '#mock-prep', icon: GraduationCap },
    { name: 'Founder', href: '#founder', icon: UserCheck },
    { name: 'Referral Bonus', href: '#referrals', icon: Gift },
    { name: 'B2B Staffing', href: '#b2b', icon: Building2 },
  ];

  const handleWhatsAppClick = () => {
    openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I am contacting you from the TalentRise website regarding current placement drives & mock prep in Hyderabad.`);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30 py-3'
            : 'bg-gradient-to-b from-[#0B132B]/90 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-full bg-white p-0.5 border border-amber-400/50 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200 overflow-hidden flex items-center justify-center">
              <img
                src="/logo.png"
                alt="TalentRise Training and Placements Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  Talent<span className="text-amber-400">Rise</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Direct Drives
                </span>
              </div>
              <span className="text-[11px] font-medium text-sky-400/90 tracking-wide uppercase">
                Training and Placements
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                className="px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Recruiter CTA */}
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-md shadow-emerald-950/40 hover:shadow-emerald-900/60 transition-all transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current text-slate-950" />
              <span className="hidden md:inline">WhatsApp Recruiter</span>
              <span className="md:hidden">WhatsApp</span>
            </button>

            {/* Recruiter Portal Lock Button */}
            <button
              onClick={onOpenAdmin}
              title="Recruiter Admin Portal"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-amber-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-400/40 transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xl:inline text-xs">Portal</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-[#0B132B] border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl z-50 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white p-0.5 border border-amber-400/50 overflow-hidden flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="TalentRise Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-base font-bold text-white">Talent<span className="text-amber-400">Rise</span></span>
                    <p className="text-[10px] text-sky-400 uppercase font-medium">Training and Placements</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-1">
                {navLinks.map(link => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => {
                        if (link.onClick) link.onClick();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-sky-400" />
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex flex-col gap-3">
              <div className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400">
                <p className="text-slate-300 font-semibold mb-0.5">Direct Recruiter Line</p>
                <p className="font-mono text-amber-400">{DISPLAY_PHONE}</p>
                <p className="text-[11px] text-slate-400 mt-1">Founder & CEO: {FOUNDER_NAME}</p>
              </div>

              <button
                onClick={() => {
                  handleWhatsAppClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-[#25D366] text-slate-950 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                Chat with Sandru Anudeep
              </button>

              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Recruiter Admin Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
