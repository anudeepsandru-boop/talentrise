import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Lock, 
  Menu, 
  X, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  UserCheck, 
  Gift, 
  Building2, 
  HeartPulse,
  Headphones
} from 'lucide-react';
import { openWhatsApp, DISPLAY_PHONE, FOUNDER_NAME } from '../utils/whatsappHelper';
import { PageType } from '../types';

interface NavbarProps {
  onOpenAdmin: () => void;
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, activePage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageType; name: string; icon: React.ElementType }[] = [
    { id: 'all', name: 'All Drives', icon: Briefcase },
    { id: 'it', name: 'IT & Engg', icon: Sparkles },
    { id: 'non-it', name: 'Non-IT', icon: Headphones },
    { id: 'medical', name: 'Medical & RCM', icon: HeartPulse },
    { id: 'mock-prep', name: 'Mock Prep', icon: GraduationCap },
    { id: 'founder', name: 'Leadership', icon: UserCheck },
    { id: 'referrals', name: 'Referral Bonus', icon: Gift },
    { id: 'b2b', name: 'B2B Staffing', icon: Building2 },
  ];

  const handleWhatsAppClick = () => {
    openWhatsApp(`Hello ${FOUNDER_NAME} Sir, I am contacting you from the TalentRise website regarding current placement drives & mock prep in Hyderabad.`);
  };

  const handleLinkClick = (pageId: PageType) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-md shadow-purple-900/5 py-2.5'
            : 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 py-3.5'
        }`}
      >
        {/* Top Cyber Neon Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] cyber-neon-bar" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button 
            onClick={() => handleLinkClick('all')} 
            className="flex items-center gap-3 group focus:outline-none text-left"
          >
            <div className="w-10 h-10 rounded-full bg-white p-0.5 border border-purple-300/80 shadow-sm group-hover:scale-105 transition-transform duration-200 overflow-hidden flex items-center justify-center">
              <img
                src="/logo.png"
                alt="TalentRise Training and Placements Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-950 group-hover:text-purple-600 transition-colors">
                  Talent<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Rise</span>
                </span>
              </div>
              <span className="text-[10px] font-bold text-cyan-600 tracking-wider uppercase">
                Training and Placements
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/90 backdrop-blur-md rounded-full border border-slate-200/80 shadow-inner">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-purple-700 border border-purple-200/80 shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/70 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Recruiter CTA */}
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-md shadow-emerald-500/20 transition-all transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current text-slate-950" />
              <span className="hidden md:inline">WhatsApp Recruiter</span>
              <span className="md:hidden">WhatsApp</span>
            </button>

            {/* Recruiter Portal Lock Button */}
            <button
              onClick={onOpenAdmin}
              title="Recruiter Admin Portal"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 shadow-sm border border-slate-900 transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden xl:inline text-xs">Portal</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
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
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-white border-l border-slate-200 p-6 flex flex-col justify-between shadow-2xl z-50 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white p-0.5 border border-purple-300 overflow-hidden flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="TalentRise Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-base font-extrabold text-slate-950">Talent<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Rise</span></span>
                    <p className="text-[10px] text-cyan-600 uppercase font-semibold">Training and Placements</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-1">
                {navLinks.map(link => {
                  const Icon = link.icon;
                  const isActive = activePage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors w-full text-left ${
                        isActive
                          ? 'bg-purple-50 text-purple-700 border border-purple-200 font-bold'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                        <span>{link.name}</span>
                      </div>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-col gap-3">
              <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <p className="text-slate-900 font-bold mb-0.5">Direct Recruiter Line</p>
                <p className="font-mono text-purple-600 font-bold">{DISPLAY_PHONE}</p>
                <p className="text-[11px] text-slate-500 mt-1">Founder & CEO: {FOUNDER_NAME}</p>
              </div>

              <button
                onClick={() => {
                  handleWhatsAppClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-[#25D366] text-slate-950 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                Chat with Sandru Anudeep
              </button>

              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold bg-slate-950 text-white hover:bg-slate-800"
              >
                <Lock className="w-3.5 h-3.5 text-pink-400" />
                Recruiter Admin Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
