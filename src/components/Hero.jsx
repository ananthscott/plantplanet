import { useState, useEffect } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SpaIcon from '@mui/icons-material/Spa';

const slides = [
  {
    image: "/images/hero-1.jpg",
    headline: "Bring Nature",
    highlight: "Indoors",
    sub: "Handpicked premium plants delivered to your doorstep across India",
  },
  {
    image: "/images/hero-2.jpg",
    headline: "Green Living",
    highlight: "Made Easy",
    sub: "Over 100 varieties of curated indoor & outdoor plants",
  },
  {
    image: "/images/hero-3.jpg",
    headline: "Your Perfect",
    highlight: "Plant Awaits",
    sub: "Expert care guides included with every plant order",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background image */}
      {slides.map((s, i) => (
        <div key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={s.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/80 via-forest-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <SpaIcon sx={{ fontSize: 16 }} className="text-forest-300" />
              <span className="font-body text-white/90 text-xs tracking-widest uppercase">Premium Plant Boutique</span>
            </div>

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-2">
              {slide.headline}
            </h1>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold italic text-forest-300 leading-none mb-6">
              {slide.highlight}
            </h1>
            <p className="font-body text-white/80 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
              {slide.sub}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#shop" className="bg-forest-600 hover:bg-forest-700 text-white font-body font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-forest-900/30 hover:-translate-y-0.5 text-sm tracking-wide uppercase">
                Shop Now
              </a>
              <a href="#shop" className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-body px-8 py-4 rounded-full transition-all duration-300 text-sm tracking-wide uppercase">
                Explore Plants
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-14">
              {[['500+', 'Plant Varieties'], ['50K+', 'Happy Customers'], ['4.9★', 'Average Rating']].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display text-2xl font-bold text-white">{num}</p>
                  <p className="font-body text-white/60 text-xs uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2 bg-forest-400' : 'w-2 h-2 bg-white/40'}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 text-white/50">
        <span className="font-body text-xs tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <ArrowDownwardIcon sx={{ fontSize: 16 }} className="animate-bounce" />
      </div>
    </div>
  );
}
