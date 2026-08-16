export const translations = {
  en: {
    nav_explore: "Explore Tours",
    nav_rentals: "Vehicle Rentals",
    nav_dashboard: "Dashboard",
    nav_checkout: "Checkout",
    hero_title: "Discover Your Next Adventure",
    hero_subtitle: "Book exclusive tours, rent premium vehicles, and manage your journey in one seamless experience.",
    btn_book_now: "Book Now",
    btn_view_details: "View Details",
    loyalty_points: "Points",
    real_time_alert: "High demand! Only a few spots left.",
    status_upcoming: "Upcoming",
    status_completed: "Completed",
    checkout_title: "Secure Checkout",
    dashboard_title: "My Itinerary & Rewards"
  },
  es: {
    nav_explore: "Explorar Tours",
    nav_rentals: "Alquiler de Vehículos",
    nav_dashboard: "Panel",
    nav_checkout: "Pagar",
    hero_title: "Descubre Tu Próxima Aventura",
    hero_subtitle: "Reserva tours exclusivos, alquila vehículos premium y gestiona tu viaje en una experiencia sin fisuras.",
    btn_book_now: "Reservar Ahora",
    btn_view_details: "Ver Detalles",
    loyalty_points: "Puntos",
    real_time_alert: "¡Alta demanda! Solo quedan unos pocos lugares.",
    status_upcoming: "Próximos",
    status_completed: "Completados",
    checkout_title: "Pago Seguro",
    dashboard_title: "Mi Itinerario y Recompensas"
  },
  fr: {
    nav_explore: "Explorer les Tours",
    nav_rentals: "Location de Véhicules",
    nav_dashboard: "Tableau de Bord",
    nav_checkout: "Paiement",
    hero_title: "Découvrez Votre Prochaine Aventure",
    hero_subtitle: "Réservez des visites exclusives, louez des véhicules premium et gérez votre voyage en une expérience fluide.",
    btn_book_now: "Réserver",
    btn_view_details: "Voir les Détails",
    loyalty_points: "Points",
    real_time_alert: "Forte demande ! Plus que quelques places.",
    status_upcoming: "À venir",
    status_completed: "Terminé",
    checkout_title: "Paiement Sécurisé",
    dashboard_title: "Mon Itinéraire et Récompenses"
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
