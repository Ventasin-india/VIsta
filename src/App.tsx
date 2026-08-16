import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Tours } from './pages/Tours';
import { Rentals } from './pages/Rentals';
import { Dashboard } from './pages/Dashboard';
import { Checkout } from './pages/Checkout';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tours" element={<Tours />} />
            <Route path="rentals" element={<Rentals />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
