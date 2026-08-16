import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, TranslationKey } from '../lib/i18n';
import { Tour, Vehicle } from '../lib/data';

export type Notification = {
  id: string;
  message: string;
  type: 'info' | 'success' | 'alert';
};

export type BookingInfo = {
  id: string;
  itemTitle: string;
  date: string;
  status: 'Upcoming' | 'Completed';
  image: string;
};

type AppContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  points: number;
  addPoints: (amount: number) => void;
  notifications: Notification[];
  addNotification: (message: string, type?: 'info' | 'success' | 'alert') => void;
  removeNotification: (id: string) => void;
  cartItem: (Tour | Vehicle) | null;
  setCartItem: (item: (Tour | Vehicle) | null) => void;
  itinerary: BookingInfo[];
  addBooking: (booking: BookingInfo) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [points, setPoints] = useState(1250); // initial loyalty points
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [cartItem, setCartItem] = useState<(Tour | Vehicle) | null>(null);
  const [itinerary, setItinerary] = useState<BookingInfo[]>([
    {
      id: 'b1',
      itemTitle: 'Kyoto Heritage Walk & Tea Ceremony',
      date: '2027-04-12',
      status: 'Upcoming',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'b2',
      itemTitle: 'Vespa Primavera Rental (2 Days)',
      date: '2023-08-15',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1566215357946-b63025091c0e?q=80&w=400&auto=format&fit=crop'
    }
  ]);

  const t = (key: TranslationKey) => translations[language][key] || translations['en'][key];

  const addPoints = (amount: number) => setPoints((prev) => prev + amount);

  const addNotification = (message: string, type: 'info' | 'success' | 'alert' = 'info') => {
    const id = Math.random().toString(36).substring(7);
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addBooking = (booking: BookingInfo) => {
    setItinerary((prev) => [booking, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        points,
        addPoints,
        notifications,
        addNotification,
        removeNotification,
        cartItem,
        setCartItem,
        itinerary,
        addBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
