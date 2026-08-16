import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { Globe, Compass, Car, LayoutDashboard, CreditCard, Bell, Menu, X, Award } from 'lucide-react';
import { cn } from '../lib/utils';
import { Language } from '../lib/i18n';

export function Layout() {
  const { language, setLanguage, t, points, notifications } = useAppContext();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);

  const navLinks = [
    { name: t('nav_explore'), path: '/tours', icon: Compass },
    { name: t('nav_rentals'), path: '/rentals', icon: Car },
    { name: t('nav_dashboard'), path: '/dashboard', icon: LayoutDashboard },
  ];

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
    setLangOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-teal-700 text-white font-sans flex flex-col relative">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Brand Zone */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md">
                <Globe className="h-6 w-6 text-teal-300" />
                <span className="font-bold text-xl tracking-tighter text-white">Atlas<span className="text-teal-300">Travel</span></span>
              </Link>
            </div>

            {/* Desktop Nav Zone */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm",
                      isActive
                        ? "border-white text-white"
                        : "border-transparent text-white/80 hover:text-white hover:border-white/50"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Zone */}
            <div className="hidden md:flex items-center gap-6">
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 text-xs text-white/80 hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                  <span>{language.toUpperCase()}</span>
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-2 w-32 backdrop-blur-xl bg-indigo-900/90 rounded-xl shadow-lg border border-white/20 py-1">
                    {(['en', 'es', 'fr'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => toggleLanguage(lang)}
                        className="block w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                      >
                        {lang === 'en' ? 'English' : lang === 'es' ? 'Español' : 'Français'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Loyalty Points */}
              <div className="flex items-center gap-1.5 bg-white/10 text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/20">
                <Award className="h-4 w-4 text-teal-300" />
                <span>{points.toLocaleString()} <span className="text-[10px] uppercase text-white/70">{t('loyalty_points')}</span></span>
              </div>

            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 backdrop-blur-xl bg-black/20">
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                    location.pathname === link.path
                      ? "bg-white/10 border-white text-white"
                      : "border-transparent text-white/80 hover:bg-white/5 hover:border-white/50 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-4 border-t border-white/20 px-4 flex justify-between items-center">
              <div className="flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/20">
                <Award className="h-4 w-4 text-teal-300" />
                <span>{points.toLocaleString()} <span className="text-[10px] uppercase text-white/70">{t('loyalty_points')}</span></span>
              </div>
              <div className="flex gap-2">
                 {(['en', 'es', 'fr'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setMobileMenuOpen(false); }}
                      className={cn(
                        "text-sm font-medium px-2 py-1 rounded",
                        language === lang ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
                      )}
                    >
                      {lang.toUpperCase()}
                    </button>
                 ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Toasts / Notifications */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className={cn(
              "p-4 w-80 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl animate-in slide-in-from-right-8",
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white",
                note.type === 'alert' && "bg-orange-500",
                note.type === 'success' && "bg-teal-500",
                note.type === 'info' && "bg-blue-500"
              )}>
                <Bell className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Status Update</h4>
              <span className="ml-auto text-[10px] text-white/50 uppercase">Just now</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">{note.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
