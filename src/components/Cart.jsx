import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';
import { IconButton } from '@mui/material';
import { useCart } from '../context/CartContext';

export default function Cart({ onClose }) {
  const { items, removeFromCart, updateQty, total } = useCart();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-forest-100 bg-cream">
        <div className="flex items-center gap-2">
          <ShoppingBagOutlinedIcon className="text-forest-700" />
          <h2 className="font-display text-xl font-semibold text-forest-900">Your Cart</h2>
          <span className="bg-forest-100 text-forest-700 text-xs font-bold px-2 py-0.5 rounded-full">{items.length}</span>
        </div>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-forest-400">
            <LocalFloristOutlinedIcon sx={{ fontSize: 64 }} />
            <p className="font-display text-xl text-forest-600">Your cart is empty</p>
            <p className="font-body text-sm text-forest-400">Add some beautiful plants!</p>
            <button onClick={onClose} className="bg-forest-700 text-white font-body font-bold px-6 py-3 rounded-full text-sm hover:bg-forest-800 transition-colors mt-2">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm border border-forest-50">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&q=80'; }} />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-forest-900 text-sm truncate">{item.name}</p>
                  <p className="font-accent italic text-forest-500 text-xs">{item.subtitle}</p>
                  <p className="font-display text-forest-700 font-bold text-sm mt-1">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <IconButton size="small" onClick={() => removeFromCart(item.id)} sx={{ color: '#9ca3af' }}>
                    <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <div className="flex items-center border border-forest-200 rounded-full overflow-hidden text-xs">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2.5 py-1 hover:bg-forest-50 text-forest-700 font-bold">−</button>
                    <span className="px-2 font-bold text-forest-900">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2.5 py-1 hover:bg-forest-50 text-forest-700 font-bold">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t border-forest-100 px-6 py-5 bg-cream">
          {/* Free shipping progress */}
          <div className="mb-4">
            {total >= 999 ? (
              <p className="font-body text-xs text-forest-600 text-center">🎉 You get <strong>Free Delivery!</strong></p>
            ) : (
              <>
                <div className="flex justify-between font-body text-xs text-forest-600 mb-1">
                  <span>Add ₹{(999 - total).toLocaleString('en-IN')} more for free delivery</span>
                  <span>{Math.round((total / 999) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-forest-100 rounded-full overflow-hidden">
                  <div className="h-full bg-forest-500 rounded-full transition-all" style={{ width: `${Math.min(100, (total / 999) * 100)}%` }} />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between mb-4">
            <span className="font-body text-forest-700">Subtotal</span>
            <span className="font-display text-xl font-bold text-forest-900">₹{total.toLocaleString('en-IN')}</span>
          </div>

          <button className="w-full bg-forest-700 hover:bg-forest-800 text-white font-body font-bold py-4 rounded-2xl transition-all hover:shadow-lg hover:shadow-forest-900/20 hover:-translate-y-0.5 mb-2">
            Proceed to Checkout
          </button>
          <button onClick={onClose} className="w-full text-forest-600 font-body text-sm py-2 hover:text-forest-800 transition-colors">
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
