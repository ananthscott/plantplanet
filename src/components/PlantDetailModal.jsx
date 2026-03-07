import { useState } from 'react';
import { Dialog, Rating, Chip, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import FilterDramaOutlinedIcon from '@mui/icons-material/FilterDramaOutlined';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useCart } from '../context/CartContext';

const CareItem = ({ icon, label, value }) => (
  <div className="bg-forest-50 rounded-xl p-3 flex flex-col items-center gap-1">
    <div className="text-forest-600">{icon}</div>
    <p className="font-body text-xs text-forest-500 uppercase tracking-wide">{label}</p>
    <p className="font-body text-xs font-bold text-forest-800 text-center">{value}</p>
  </div>
);

export default function PlantDetailModal({ plant, onClose }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [snack, setSnack] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!plant) return null;

  const discount = Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(plant);
    setSnack(true);
  };

  const allImages = [plant.image, ...(plant.gallery || [])].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <>
      <Dialog open={!!plant} onClose={onClose} maxWidth="md" fullWidth
        PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden', bgcolor: '#faf7f0' } }}>
        <div className="flex flex-col md:flex-row min-h-[70vh]">
          {/* Image panel */}
          <div className="md:w-1/2 relative bg-forest-100">
            <img
              src={allImages[activeImg]}
              alt={plant.name}
              className="w-full h-72 md:h-full object-cover"
              onError={(e) => { e.target.src = plant.image; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/30 to-transparent" />

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                {allImages.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? 'border-white scale-110' : 'border-white/40'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.src = plant.image; }} />
                  </button>
                ))}
              </div>
            )}

            {/* Tags on image */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-1">
              {plant.tags?.map(tag => (
                <span key={tag} className="bg-white/90 text-forest-700 text-xs font-bold px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>

            <button onClick={onClose}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-1.5 transition-colors">
              <CloseIcon sx={{ fontSize: 20 }} />
            </button>
          </div>

          {/* Details panel */}
          <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
            <div className="mb-1">
              <span className="font-body text-xs uppercase tracking-widest text-forest-500 bg-forest-100 px-2 py-0.5 rounded-full">{plant.category}</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-forest-900 mt-2">{plant.name}</h2>
            <p className="font-accent italic text-forest-500 text-lg">{plant.subtitle}</p>

            <div className="flex items-center gap-2 mt-2 mb-4">
              <Rating value={plant.rating} precision={0.1} readOnly size="small" sx={{ color: '#15803d' }} />
              <span className="font-body text-sm text-forest-600">{plant.rating} ({plant.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-display text-4xl font-bold text-forest-800">₹{plant.price.toLocaleString('en-IN')}</span>
              <span className="font-body text-lg text-earth-400 line-through">₹{plant.originalPrice.toLocaleString('en-IN')}</span>
              <span className="bg-earth-100 text-earth-600 text-sm font-bold px-2 py-0.5 rounded-full">{discount}% off</span>
            </div>

            {/* Shipping */}
            <div className="flex items-center gap-2 text-forest-600 mb-4">
              <LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />
              <span className="font-body text-sm">Free delivery on orders above ₹999</span>
            </div>

            <p className="font-body text-forest-700 text-sm leading-relaxed mb-5">{plant.description}</p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-2 mb-5">
              {plant.benefits.map(b => (
                <div key={b} className="flex items-center gap-1 text-forest-700">
                  <CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#15803d' }} />
                  <span className="font-body text-xs">{b}</span>
                </div>
              ))}
            </div>

            {/* Care guide */}
            <div className="mb-5">
              <h4 className="font-display font-semibold text-forest-900 mb-3">Care Guide</h4>
              <div className="grid grid-cols-3 gap-2">
                <CareItem icon={<WbSunnyOutlinedIcon sx={{ fontSize: 20 }} />} label="Light" value={plant.care.light} />
                <CareItem icon={<WaterDropOutlinedIcon sx={{ fontSize: 20 }} />} label="Water" value={plant.care.water} />
                <CareItem icon={<ThermostatOutlinedIcon sx={{ fontSize: 20 }} />} label="Temp" value={plant.care.temperature} />
                <CareItem icon={<FilterDramaOutlinedIcon sx={{ fontSize: 20 }} />} label="Humidity" value={plant.care.humidity} />
                <CareItem icon={<SpeedIcon sx={{ fontSize: 20 }} />} label="Difficulty" value={plant.care.difficulty} />
              </div>
            </div>

            {/* Size & Pot info */}
            <div className="flex gap-4 text-sm font-body text-forest-700 bg-forest-50 rounded-xl p-3 mb-5">
              <div><span className="text-forest-500">Size: </span>{plant.size}</div>
              <div className="border-l border-forest-200 pl-4"><span className="text-forest-500">Pot: </span>{plant.pot}</div>
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-forest-200 rounded-full overflow-hidden bg-white">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2 text-forest-700 hover:bg-forest-50 transition-colors font-bold text-lg">−</button>
                <span className="w-8 text-center font-body font-bold text-forest-900">{qty}</span>
                <button onClick={() => setQty(q => Math.min(plant.stock, q + 1))} className="px-4 py-2 text-forest-700 hover:bg-forest-50 transition-colors font-bold text-lg">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-forest-700 hover:bg-forest-800 text-white font-body font-bold py-3 rounded-full flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-forest-900/20 hover:-translate-y-0.5"
              >
                <AddShoppingCartIcon sx={{ fontSize: 20 }} />
                Add to Cart — ₹{(plant.price * qty).toLocaleString('en-IN')}
              </button>
            </div>

            <p className={`text-xs font-body mt-3 text-center ${plant.stock < 10 ? 'text-red-500' : 'text-forest-500'}`}>
              {plant.stock < 10 ? `⚡ Only ${plant.stock} left in stock` : `✓ ${plant.stock} items in stock`}
            </p>
          </div>
        </div>
      </Dialog>

      <Snackbar open={snack} autoHideDuration={2000} onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSnack(false)} sx={{ fontFamily: 'Lato' }}>
          {qty} × {plant.name} added to cart!
        </Alert>
      </Snackbar>
    </>
  );
}
