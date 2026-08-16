import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { formatCurrency } from '../lib/utils';
import { ShieldCheck, CreditCard, Lock } from 'lucide-react';

export function Checkout() {
  const { cartItem, setCartItem, addBooking, addPoints, addNotification, t } = useAppContext();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-redirect if cart is empty
  React.useEffect(() => {
    if (!cartItem) {
      navigate('/');
    }
  }, [cartItem, navigate]);

  if (!cartItem) return null;

  const price = 'price' in cartItem ? cartItem.price : cartItem.pricePerDay;
  const isVehicle = 'type' in cartItem;
  const total = price + (price * 0.1); // add 10% tax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call for secure payment
    setTimeout(() => {
      // 1. Add to itinerary
      addBooking({
        id: Math.random().toString(36).substring(7),
        itemTitle: isVehicle ? cartItem.name : cartItem.title,
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 weeks from now
        status: 'Upcoming',
        image: cartItem.imageUrl
      });
      
      // 2. Grant loyalty points (e.g. 1 point per $1 spent)
      const pointsEarned = Math.floor(total);
      addPoints(pointsEarned);
      
      // 3. Notify user
      addNotification(`Booking confirmed! You earned ${pointsEarned} loyalty points.`, 'success');
      
      // 4. Clear cart and redirect to dashboard
      setCartItem(null);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-8">{t('checkout_title')}</h1>
      
      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Form Section */}
        <div className="md:col-span-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-[2rem] p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-teal-300 mb-6 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Traveler Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first_name" className="block text-xs font-bold text-white/60 uppercase">First Name</label>
                  <input required type="text" id="first_name" className="w-full rounded-xl bg-white/5 border-white/10 border px-4 py-3 text-sm text-white focus:bg-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder:text-white/30" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last_name" className="block text-xs font-bold text-white/60 uppercase">Last Name</label>
                  <input required type="text" id="last_name" className="w-full rounded-xl bg-white/5 border-white/10 border px-4 py-3 text-sm text-white focus:bg-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder:text-white/30" placeholder="Doe" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold text-white/60 uppercase">Email Address</label>
                  <input required type="email" id="email" className="w-full rounded-xl bg-white/5 border-white/10 border px-4 py-3 text-sm text-white focus:bg-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder:text-white/30" placeholder="jane@example.com" />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-300 mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Secure Payment
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="card_number" className="block text-xs font-bold text-white/60 uppercase">Card Number</label>
                  <input required type="text" id="card_number" className="w-full rounded-xl bg-white/5 border-white/10 border px-4 py-3 text-sm text-white focus:bg-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder:text-white/30" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label htmlFor="expiry" className="block text-xs font-bold text-white/60 uppercase">Expiration Date</label>
                    <input required type="text" id="expiry" className="w-full rounded-xl bg-white/5 border-white/10 border px-4 py-3 text-sm text-white focus:bg-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder:text-white/30" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cvc" className="block text-xs font-bold text-white/60 uppercase">CVC</label>
                    <input required type="text" id="cvc" className="w-full rounded-xl bg-white/5 border-white/10 border px-4 py-3 text-sm text-white focus:bg-white/10 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder:text-white/30" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white px-6 py-4 rounded-xl font-bold hover:bg-teal-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg shadow-teal-900/20"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Lock className="h-4 w-4" /> Pay {formatCurrency(total)}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1 backdrop-blur-md bg-black/20 border border-white/10 rounded-[2rem] p-6 shadow-2xl">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-6">Order Summary</h3>
          <div className="aspect-video rounded-xl overflow-hidden mb-5 border border-white/10 relative">
            <img src={cartItem.imageUrl} alt={isVehicle ? cartItem.name : cartItem.title} className="w-full h-full object-cover" />
          </div>
          <p className="font-bold text-white mb-1">{isVehicle ? cartItem.name : cartItem.title}</p>
          <p className="text-xs text-teal-400 font-bold uppercase tracking-wider mb-6">{isVehicle ? cartItem.type : cartItem.location}</p>
          
          <div className="space-y-3 text-sm pb-5 border-b border-white/10 mb-5">
            <div className="flex justify-between text-white/70">
              <span>Subtotal</span>
              <span>{formatCurrency(price)}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Taxes & Fees (10%)</span>
              <span>{formatCurrency(price * 0.1)}</span>
            </div>
          </div>
          <div className="flex justify-between font-black text-white text-xl">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
