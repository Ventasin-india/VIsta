export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type Tour = {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewsCount: number;
  availableSpots: number;
  imageUrl: string;
  description: string;
  duration: string;
  reviews: Review[];
};

export type Vehicle = {
  id: string;
  name: string;
  type: "Car" | "Motorcycle" | "Van";
  pricePerDay: number;
  rating: number;
  available: boolean;
  imageUrl: string;
  features: string[];
  reviews: Review[];
};

export const MOCK_REVIEWS: Review[] = [
  { id: "r1", author: "Sarah Jenkins", rating: 5, text: "Absolutely incredible experience. Well organized and breathtaking views.", date: "2023-10-12" },
  { id: "r2", author: "Michael Chen", rating: 4, text: "Great time overall, but the pickup was a bit late. The guide was fantastic though.", date: "2023-09-28" },
  { id: "r3", author: "Elena Rossi", rating: 5, text: "Exceeded all expectations. Would definitely book again!", date: "2023-11-05" },
];

export const TOURS: Tour[] = [
  {
    id: "t1",
    title: "Kyoto Heritage Walk & Tea Ceremony",
    location: "Kyoto, Japan",
    price: 120,
    rating: 4.8,
    reviewsCount: 342,
    availableSpots: 8,
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    description: "Immerse yourself in the ancient traditions of Kyoto. Walk through historic districts with an expert guide and experience an authentic tea ceremony.",
    duration: "4 Hours",
    reviews: MOCK_REVIEWS
  },
  {
    id: "t2",
    title: "Amalfi Coast Yacht Excursion",
    location: "Amalfi, Italy",
    price: 450,
    rating: 4.9,
    reviewsCount: 128,
    availableSpots: 2,
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
    description: "Sail the crystal-clear waters of the Amalfi Coast on a private yacht. Includes snorkeling stops, local wine, and a sunset dinner.",
    duration: "Full Day",
    reviews: MOCK_REVIEWS
  },
  {
    id: "t3",
    title: "Serengeti Safari Adventure",
    location: "Tanzania",
    price: 1250,
    rating: 5.0,
    reviewsCount: 89,
    availableSpots: 12,
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
    description: "Witness the Great Migration and spot the Big Five in this immersive 3-day guided safari through the Serengeti National Park.",
    duration: "3 Days",
    reviews: MOCK_REVIEWS
  },
  {
    id: "t4",
    title: "Northern Lights Snowmobile Tour",
    location: "Tromsø, Norway",
    price: 185,
    rating: 4.7,
    reviewsCount: 215,
    availableSpots: 4,
    imageUrl: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?q=80&w=1200&auto=format&fit=crop",
    description: "Race through snow-covered landscapes under the aurora borealis. Warm up in a traditional lavvu with a hot meal.",
    duration: "5 Hours",
    reviews: MOCK_REVIEWS
  }
];

export const VEHICLES: Vehicle[] = [
  {
    id: "v1",
    name: "Range Rover Velar",
    type: "Car",
    pricePerDay: 150,
    rating: 4.9,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?q=80&w=1200&auto=format&fit=crop",
    features: ["Automatic", "5 Seats", "GPS", "4WD"],
    reviews: MOCK_REVIEWS
  },
  {
    id: "v2",
    name: "Vespa Primavera",
    type: "Motorcycle",
    pricePerDay: 45,
    rating: 4.6,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1566215357946-b63025091c0e?q=80&w=1200&auto=format&fit=crop",
    features: ["Manual", "2 Seats", "Helmet Included"],
    reviews: MOCK_REVIEWS
  },
  {
    id: "v3",
    name: "Mercedes-Benz Sprinter",
    type: "Van",
    pricePerDay: 195,
    rating: 4.8,
    available: false,
    imageUrl: "https://images.unsplash.com/photo-1566838318109-b690d79d7249?q=80&w=1200&auto=format&fit=crop",
    features: ["Automatic", "12 Seats", "Extra Luggage Space"],
    reviews: MOCK_REVIEWS
  },
  {
    id: "v4",
    name: "Tesla Model 3",
    type: "Car",
    pricePerDay: 110,
    rating: 4.9,
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200&auto=format&fit=crop",
    features: ["Automatic", "5 Seats", "Electric", "Autopilot"],
    reviews: MOCK_REVIEWS
  }
];
