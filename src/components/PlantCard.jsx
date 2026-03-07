import { useState } from 'react';
import { IconButton, Chip, Rating, Snackbar, Alert } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { useCart } from '../context/CartContext';

export default function PlantCard({ plant, onClick }) {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [snack, setSnack] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(plant);
    setSnack(true);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(l => !l);
  };

  const discount = Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100);

  return (
    <>
      <div
        onClick={() => onClick(plant)}
        className="group bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-forest-200/60 transition-all duration-400 hover:-translate-y-1 border border-forest-50"
      >
        {/* Image */}
        <div className="relative overflow-hidden h-64">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
            style={{ '--tw-scale-x': '1.08', '--tw-scale-y': '1.08' }}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80'; }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Tags */}
          <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
            {plant.tags?.slice(0, 2).map(tag => (
              <span key={tag} className="bg-white/90 text-forest-700 text-xs font-body font-bold px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute top-3 right-12 bg-earth-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -{discount}%
            </div>
          )}

          {/* Like button */}
          <IconButton
            onClick={handleLike}
            size="small"
            className="!absolute !top-2 !right-2 !bg-white/80 !backdrop-blur-sm hover:!bg-white"
            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.8)' }}
          >
            {liked ? <FavoriteIcon sx={{ fontSize: 18, color: '#e53935' }} /> : <FavoriteBorderIcon sx={{ fontSize: 18 }} />}
          </IconButton>

          {/* Add to cart on hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="w-full bg-forest-700 hover:bg-forest-800 text-white font-body font-bold text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <AddShoppingCartIcon sx={{ fontSize: 18 }} />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="font-display font-semibold text-forest-900 text-lg leading-tight">{plant.name}</h3>
              <p className="font-accent italic text-forest-500 text-sm">{plant.subtitle}</p>
            </div>
            <span className="text-xs font-body bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full border border-forest-100">
              {plant.category}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2 mb-3">
            <Rating value={plant.rating} precision={0.1} readOnly size="small" sx={{ color: '#15803d' }} />
            <span className="font-body text-xs text-forest-600">({plant.reviews})</span>
          </div>

          {/* Care quick info */}
          <div className="flex gap-3 mb-3">
            <div className="flex items-center gap-1 text-forest-600">
              <WbSunnyOutlinedIcon sx={{ fontSize: 14 }} />
              <span className="text-xs font-body">{plant.care.light.split(' ')[0]}</span>
            </div>
            <div className="flex items-center gap-1 text-forest-600">
              <WaterDropOutlinedIcon sx={{ fontSize: 14 }} />
              <span className="text-xs font-body">{plant.care.water}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold text-forest-800">₹{plant.price.toLocaleString('en-IN')}</span>
              <span className="font-body text-sm text-earth-400 line-through">₹{plant.originalPrice.toLocaleString('en-IN')}</span>
            </div>
            <span className={`text-xs font-body ${plant.stock < 10 ? 'text-red-500' : 'text-forest-500'}`}>
              {plant.stock < 10 ? `Only ${plant.stock} left` : 'In Stock'}
            </span>
          </div>
        </div>
      </div>

      <Snackbar open={snack} autoHideDuration={2000} onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" sx={{ fontFamily: 'Lato, sans-serif' }} onClose={() => setSnack(false)}>
          {plant.name} added to cart!
        </Alert>
      </Snackbar>
    </>
  );
}
