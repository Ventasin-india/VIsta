import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { VEHICLES, Vehicle } from '../lib/data';
import { Star, Check, X } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export function Rentals() {
  const { setCartItem, t } = useAppContext();
  const navigate = useNavigate();

  const handleRent = (vehicle: Vehicle) => {
    if (!vehicle.available) return;
    setCartItem(vehicle);
    navigate('/checkout');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">{t('nav_rentals')}</h1>
        <p className="text-white/60 mt-2">Find the perfect vehicle for your journey. Flexible rentals and great rates.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {VEHICLES.map((vehicle) => (
          <div key={vehicle.id} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/10 transition-colors flex flex-col">
            <div className="h-48 relative">
              <img src={vehicle.imageUrl} alt={vehicle.name} className="w-full h-full object-cover" />
              {!vehicle.available && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="bg-white/10 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg tracking-wide uppercase border border-white/20">
                    Unavailable
                  </span>
                </div>
              )}
              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                {vehicle.type}
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white leading-tight">{vehicle.name}</h3>
                <div className="flex items-center gap-1 text-[10px] font-bold bg-black/40 backdrop-blur-md text-white px-2 py-1 rounded-lg">
                  <Star className="h-3 w-3 fill-current text-yellow-400" />
                  <span>{vehicle.rating}</span>
                </div>
              </div>
              
              <ul className="text-sm text-white/70 space-y-1 mb-6 mt-3">
                {vehicle.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-teal-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="text-xl font-bold text-white">{formatCurrency(vehicle.pricePerDay)}</span>
                  <span className="text-xs text-white/50 ml-1">/ day</span>
                </div>
                <button
                  onClick={() => handleRent(vehicle)}
                  disabled={!vehicle.available}
                  className="bg-teal-500 text-white hover:bg-teal-400 disabled:bg-white/5 disabled:text-white/40 disabled:border disabled:border-white/10 px-4 py-2 rounded-xl font-bold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg shadow-teal-900/20 disabled:shadow-none"
                >
                  {vehicle.available ? t('btn_book_now') : 'Sold Out'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
