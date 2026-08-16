import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { TOURS, VEHICLES } from '../lib/data';
import { ArrowRight, Star } from 'lucide-react';

export function Home() {
  const { t } = useAppContext();
  const navigate = useNavigate();

  const featuredTours = TOURS.slice(0, 2);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 shadow-inner p-8 lg:p-16 flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2000&auto=format&fit=crop"
            alt="Travel Landscape"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent flex items-center justify-center opacity-50 z-0 pointer-events-none">
          <div className="w-64 h-64 rounded-full border-[16px] border-white/5 animate-pulse"></div>
        </div>
        <div className="relative z-10 w-full max-w-2xl flex flex-col items-start justify-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-tight text-white">
            {t('hero_title')}
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl text-white/70">
            {t('hero_subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/tours')}
              className="bg-white text-indigo-900 hover:bg-white/90 px-6 py-3 rounded-xl font-bold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white inline-flex items-center gap-2"
            >
              {t('nav_explore')} <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/rentals')}
              className="bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 px-6 py-3 rounded-xl font-bold text-sm transition-colors border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white inline-flex items-center gap-2"
            >
              {t('nav_rentals')}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Experiences</h2>
            <p className="text-white/60 mt-2">Hand-picked tours with exceptional reviews.</p>
          </div>
          <button
            onClick={() => navigate('/tours')}
            className="text-white/80 font-bold text-sm hover:text-white transition-colors hidden sm:block"
          >
            View all
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredTours.map((tour) => (
            <div key={tour.id} className="group relative rounded-[2rem] overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 flex flex-col sm:flex-row h-full cursor-pointer hover:bg-white/10 transition-colors" onClick={() => navigate('/tours')}>
              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden relative">
                <img
                  src={tour.imageUrl}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-white border border-white/10 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current text-yellow-400" /> {tour.rating} ({tour.reviewsCount})
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-lg text-white line-clamp-2 mb-2">{tour.title}</h3>
                  <p className="text-xs text-white/60 mb-4">{tour.location} • {tour.duration}</p>
                  <p className="text-sm text-white/70 line-clamp-3 mb-4">{tour.description}</p>
                </div>
                <div className="flex justify-between items-end mt-auto">
                  <p className="text-xl font-bold text-white">${tour.price} <span className="text-xs font-normal text-white/50">/ person</span></p>
                  <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 px-2 py-1 rounded-md uppercase border border-teal-500/30">
                    {t('btn_view_details')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
