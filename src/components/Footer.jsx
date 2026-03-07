import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const features = [
  { icon: <LocalShippingOutlinedIcon sx={{ fontSize: 32 }} />, title: 'Free Delivery', desc: 'On orders above ₹999 across India' },
  { icon: <VerifiedOutlinedIcon sx={{ fontSize: 32 }} />, title: 'Quality Guaranteed', desc: 'Every plant checked before dispatch' },
  { icon: <HeadsetMicOutlinedIcon sx={{ fontSize: 32 }} />, title: 'Plant Experts', desc: '7-day post-purchase care support' },
  { icon: <RecyclingOutlinedIcon sx={{ fontSize: 32 }} />, title: 'Eco Packaging', desc: '100% biodegradable packaging' },
];

export function Features() {
  return (
    <section className="bg-forest-900 py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map(f => (
          <div key={f.title} className="flex flex-col items-center text-center gap-3">
            <div className="text-forest-300">{f.icon}</div>
            <h4 className="font-display font-semibold text-white">{f.title}</h4>
            <p className="font-body text-forest-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function NatureStrip() {
  return (
    <div className="relative h-72 overflow-hidden my-16 rounded-3xl mx-6">
      <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=90"
        alt="Forest" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-forest-950/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="font-accent italic text-forest-300 text-xl mb-2">A message from us</p>
        <h3 className="font-display text-4xl font-bold text-white max-w-2xl">
          "In every walk with nature, one receives far more than he seeks."
        </h3>
        <p className="font-body text-white/60 mt-3 text-sm">— John Muir</p>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <LocalFloristOutlinedIcon sx={{ fontSize: 24, color: '#4ade80' }} />
              <span className="font-display text-xl font-bold">Verdant</span>
            </div>
            <p className="font-body text-forest-400 text-sm leading-relaxed mb-5">
              Bringing nature home since 2020. Premium plants with expert care guides, delivered across India.
            </p>
            <div className="flex gap-3">
              {[InstagramIcon, TwitterIcon, FacebookIcon].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-forest-800 hover:bg-forest-700 rounded-full flex items-center justify-center transition-colors">
                  <Icon sx={{ fontSize: 18, color: '#86efac' }} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Shop', links: ['Indoor Plants', 'Succulents', 'Outdoor Plants', 'Seeds & Bulbs', 'Planters & Pots'] },
            { title: 'Support', links: ['Care Guides', 'Shipping Info', 'Returns', 'FAQs', 'Contact Us'] },
            { title: 'Company', links: ['About Verdant', 'Blog', 'Sustainability', 'Careers', 'Press'] },
          ].map(col => (
            <div key={col.title}>
              <h5 className="font-display font-semibold text-white mb-4">{col.title}</h5>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="font-body text-forest-400 text-sm hover:text-forest-300 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-forest-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-forest-500 text-sm">© 2024 Verdant Plant Boutique. All rights reserved.</p>
          <p className="font-body text-forest-500 text-sm">Made with 🌿 for plant lovers across India</p>
        </div>
      </div>
    </footer>
  );
}
