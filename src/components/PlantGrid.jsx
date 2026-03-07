import { useState, useMemo } from 'react';
import { plants, categories } from '../data/plants';
import PlantCard from './PlantCard';
import PlantDetailModal from './PlantDetailModal';
import TuneIcon from '@mui/icons-material/Tune';
import SpaIcon from '@mui/icons-material/Spa';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
];

export default function PlantGrid({ searchQuery }) {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [selectedPlant, setSelectedPlant] = useState(null);

  const filtered = useMemo(() => {
    let result = plants.filter(p => {
      const matchCat = category === 'All' || p.category === category;
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    switch (sort) {
      case 'price_asc': return [...result].sort((a, b) => a.price - b.price);
      case 'price_desc': return [...result].sort((a, b) => b.price - a.price);
      case 'rating': return [...result].sort((a, b) => b.rating - a.rating);
      case 'reviews': return [...result].sort((a, b) => b.reviews - a.reviews);
      default: return result;
    }
  }, [category, sort, searchQuery]);

  return (
    <section id="shop" className="max-w-7xl mx-auto px-6 py-16">
      {/* Section header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          <SpaIcon className="text-forest-500" />
          <span className="font-body text-xs uppercase tracking-widest text-forest-500">Our Collection</span>
          <SpaIcon className="text-forest-500" />
        </div>
        <h2 className="font-display text-5xl md:text-6xl font-bold text-forest-900 mb-3">
          Find Your <span className="italic text-forest-600">Perfect</span> Plant
        </h2>
        <p className="font-body text-forest-600 max-w-lg mx-auto">
          Every plant is carefully selected, nurtured, and delivered with a care guide tailored for Indian conditions.
        </p>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white rounded-2xl shadow-sm border border-forest-50">
        {/* Category filters */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`font-body text-sm px-4 py-2 rounded-full transition-all ${category === cat ? 'bg-forest-700 text-white shadow' : 'bg-forest-50 text-forest-700 hover:bg-forest-100'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <TuneIcon sx={{ fontSize: 18 }} className="text-forest-500" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="font-body text-sm text-forest-700 bg-transparent border-none outline-none cursor-pointer"
          >
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Results count */}
      {searchQuery && (
        <p className="font-body text-forest-600 mb-6 text-sm">
          {filtered.length} results for "<strong>{searchQuery}</strong>"
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((plant, i) => (
            <div key={plant.id} className="animate-slide-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
              <PlantCard plant={plant} onClick={setSelectedPlant} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="font-display text-2xl text-forest-400">No plants found</p>
          <p className="font-body text-forest-400 mt-2 text-sm">Try a different search or category</p>
        </div>
      )}

      <PlantDetailModal plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
    </section>
  );
}
