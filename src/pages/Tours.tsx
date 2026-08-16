import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { TOURS, Tour } from '../lib/data';
import { Star, MapPin, Clock, Users } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export function Tours() {
  const { setCartItem, addNotification, t } = useAppContext();
  const navigate = useNavigate();
  const [tours, setTours] = useState<Tour[]>(TOURS);

  // Simulate real-time availability changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTours((currentTours) => {
        const randomIndex = Math.floor(Math.random() * currentTours.length);
        const tour = currentTours[randomIndex];
        if (tour.availableSpots > 1) {
          addNotification(`${tour.title} was just booked! Only ${tour.availableSpots - 1} spots left.`, 'alert');
          const newTours = [...currentTours];
          newTours[randomIndex] = { ...tour, availableSpots: tour.availableSpots - 1 };
          return newTours;
        }
        return currentTours;
      });
    }, 15000); // Every 15 seconds simulate a booking

    return () => clearInterval(interval);
  }, [addNotification]);

  const handleBook = (tour: Tour) => {
    setCartItem(tour);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">{t('nav_explore')}</h1>
        <p className="text-white/60 mt-2">Discover and book unforgettable experiences around the world.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="flex flex-col sm:flex-row backdrop-blur-md bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/10 transition-colors">
            <div className="sm:w-2/5 h-56 sm:h-auto relative shrink-0">
              <img src={tour.imageUrl} alt={tour.title} className="w-full h-full object-cover" />
              {tour.availableSpots <= 4 && (
                <div className="absolute top-3 left-3 bg-orange-500/90 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm border border-orange-400/50">
                  Only {tour.availableSpots} spots left
                </div>
              )}
            </div>
            
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-white leading-tight">{tour.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] font-bold bg-black/40 backdrop-blur-md text-white px-2 py-1 rounded-lg shrink-0 ml-3">
                    <Star className="h-3 w-3 fill-current text-yellow-400" />
                    <span>{tour.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-white/60 mb-4">
                  <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {tour.location}</div>
                  <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {tour.duration}</div>
                </div>
                
                <p className="text-sm text-white/70 line-clamp-2 mb-4">{tour.description}</p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div>
                  <span className="text-xl font-bold text-white">{formatCurrency(tour.price)}</span>
                  <span className="text-xs text-white/50 ml-1">/ person</span>
                </div>
                <button
                  onClick={() => handleBook(tour)}
                  className="bg-teal-500 text-white hover:bg-teal-400 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-teal-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {t('btn_book_now')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
