import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Semua';
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default');
  const [gridView, setGridView] = useState(true);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (category !== 'Semua') {
      result = result.filter(p => p.category === category);
    }
    
    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    return result;
  }, [search, category, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    if (cat === 'Semua') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a3f7a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Katalog Produk</h1>
          <p className="text-blue-200">Temukan songkok premium sesuai selera Anda</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari songkok..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a]"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20"
              >
                <option value="default">Urutkan</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="name">Nama A-Z</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setGridView(true)}
                className={`p-3 ${gridView ? 'bg-[#1a3f7a] text-white' : 'bg-gray-50 text-gray-500'}`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setGridView(false)}
                className={`p-3 ${!gridView ? 'bg-[#1a3f7a] text-white' : 'bg-gray-50 text-gray-500'}`}
              >
                <LayoutList size={18} />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-[#1a3f7a] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">
            Menampilkan <span className="font-semibold text-gray-800">{filteredProducts.length}</span> produk
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={gridView 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" 
            : "grid grid-cols-1 md:grid-cols-2 gap-4"
          }>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Produk tidak ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci atau filter pencarian Anda</p>
          </div>
        )}
      </div>
    </div>
  );
}
