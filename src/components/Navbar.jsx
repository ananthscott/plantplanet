import { useState, useEffect } from 'react';
import { Badge, IconButton, Drawer, Tooltip } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

export default function Navbar({ onSearch }) {
  const { count, isCartOpen, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-forest-100' : 'bg-white/20 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <LocalFloristOutlinedIcon className={`${scrolled ? 'text-forest-700' : 'text-white'}`} sx={{ fontSize: 28 }} />
            <span className={`font-display text-2xl font-bold ${scrolled ? 'text-forest-900' : 'text-white'} tracking-wide`}>Verdant</span>
            <span className={`font-accent italic ${scrolled ? 'text-earth-500' : 'text-white/90'} text-sm ml-1 hidden sm:block`}>– Plant Boutique</span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {['Shop', 'About', 'Care Guide', 'Blog'].map(link => (
              <a key={link} href="#" className={`font-body ${scrolled ? 'text-forest-800 hover:text-forest-600' : 'text-white hover:text-white/80'} transition-colors text-sm tracking-wide`}>
                {link}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {searchOpen ? (
              <div className="flex items-center bg-white border border-forest-200 rounded-full px-4 py-1 gap-2 animate-fade-in">
                <SearchIcon sx={{ fontSize: 18 }} className="text-forest-500" />
                <input
                  autoFocus
                  value={searchValue}
                  onChange={handleSearch}
                  placeholder="Search plants..."
                  className="outline-none text-sm font-body text-forest-900 bg-transparent w-40"
                />
                <IconButton size="small" onClick={() => { setSearchOpen(false); setSearchValue(''); onSearch(''); }}>
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </div>
            ) : (
              <Tooltip title="Search">
                <IconButton onClick={() => setSearchOpen(true)} size="small">
                  <SearchIcon className={scrolled ? "text-forest-700" : "text-white"} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Cart">
              <IconButton onClick={() => setIsCartOpen(true)}>
                <Badge badgeContent={count} color="success">
                  <ShoppingCartOutlinedIcon className={scrolled ? "text-forest-700" : "text-white"} />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </nav>

      <Drawer anchor="right" open={isCartOpen} onClose={() => setIsCartOpen(false)}
        PaperProps={{ sx: { width: { xs: '100vw', sm: 420 }, bgcolor: '#faf7f0' } }}>
        <Cart onClose={() => setIsCartOpen(false)} />
      </Drawer>
    </>
  );
}
