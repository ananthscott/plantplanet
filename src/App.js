import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlantGrid from './components/PlantGrid';
import { Features, NatureStrip, Footer } from './components/Footer';
import './index.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <CartProvider>
      <div className="min-h-screen bg-cream font-body">
        <Navbar onSearch={setSearchQuery} />
        <Hero />
        <PlantGrid searchQuery={searchQuery} />
        <Features />
        <NatureStrip />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
