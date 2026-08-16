import React from 'react';
import { useAppContext } from '../store/AppContext';
import { Award, Calendar, ChevronRight, PackageCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { itinerary, points, t } = useAppContext();

  const upcoming = itinerary.filter(i => i.status === 'Upcoming');
  const completed = itinerary.filter(i => i.status === 'Completed');

  const getTier = (pts: number) => {
    if (pts >= 5000) return { name: 'Platinum', color: 'text-indigo-900', bg: 'bg-white' };
    if (pts >= 2000) return { name: 'Gold', color: 'text-yellow-900', bg: 'bg-yellow-400' };
    return { name: 'Silver', color: 'text-slate-900', bg: 'bg-slate-300' };
  };

  const tier = getTier(points);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">{t('dashboard_title')}</h1>
        <p className="text-white/60 mt-2">Manage your bookings, track your trips, and view your rewards.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Rewards Card */}
        <div className="md:col-span-1 backdrop-blur-md bg-white/10 border border-white/20 rounded-[2rem] p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-300 text-sm font-bold uppercase tracking-widest mb-6">
              <Award className="h-5 w-5" />
              Loyalty Rewards
            </div>
            <div className="text-4xl font-black text-white mb-2">
              {points.toLocaleString()} <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">pts</span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs text-white/60 uppercase font-medium">Status:</span>
              <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider", tier.bg, tier.color)}>
                {tier.name}
              </span>
            </div>
          </div>
          <button className="w-full text-sm font-bold text-white bg-teal-500 hover:bg-teal-400 py-3 rounded-2xl transition-colors shadow-lg shadow-teal-900/20">
            Redeem Points
          </button>
        </div>

        {/* Upcoming Trips */}
        <div className="md:col-span-2 space-y-6">
          <div className="backdrop-blur-md bg-black/20 border border-white/10 rounded-[2rem] overflow-hidden">
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-300 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {t('status_upcoming')} Journeys
              </h2>
              <span className="text-[10px] font-bold bg-white/10 text-white px-2 py-1 rounded-lg">
                {upcoming.length}
              </span>
            </div>
            
            <div className="divide-y divide-white/5">
              {upcoming.length === 0 ? (
                <div className="p-8 text-center text-white/50">
                  No upcoming trips yet. Time to book your next adventure!
                </div>
              ) : (
                upcoming.map(item => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-white/5 transition-colors group">
                    <img src={item.image} alt={item.itemTitle} className="w-24 h-24 rounded-2xl object-cover border border-white/10 shrink-0" />
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-bold text-white mb-1">{item.itemTitle}</h3>
                      <p className="text-xs text-teal-400 font-bold uppercase tracking-wide">{new Date(item.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <button className="text-white/40 hover:text-white transition-colors p-3 rounded-full hover:bg-white/10 border border-transparent hover:border-white/20">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Past Trips */}
          <div className="backdrop-blur-md bg-black/20 border border-white/10 rounded-[2rem] overflow-hidden">
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
                <PackageCheck className="h-5 w-5" />
                {t('status_completed')}
              </h2>
            </div>
            
            <div className="divide-y divide-white/5">
              {completed.map(item => (
                <div key={item.id} className="p-5 sm:px-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div>
                    <h3 className="font-semibold text-white">{item.itemTitle}</h3>
                    <p className="text-xs text-white/40 mt-1">{new Date(item.date).toLocaleDateString()}</p>
                  </div>
                  <button className="text-xs font-bold text-teal-400 hover:text-teal-300 px-3 py-1.5 rounded-lg border border-teal-500/30 hover:bg-teal-500/10 transition-colors">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
