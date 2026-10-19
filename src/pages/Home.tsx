import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Star, Award } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a3f7a] via-[#1e4a8f] to-[#0f2847] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full mb-6 border border-white/20">
                ✨ Koleksi Terbaru 2024
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Songkok Premium
                <br />
                <span className="text-blue-200">Berkualitas Tinggi</span>
              </h1>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-lg">
                Menyediakan berbagai varian songkok premium dengan bahan beludru berkualitas. Nyaman, elegan, dan tahan lama.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 bg-white text-[#1a3f7a] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                >
                  Lihat Katalog
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
                >
                  Tentang Kami
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <div className="w-60 h-60 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-2">🕌</div>
                      <p className="text-blue-200 font-medium">Premium Quality</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white text-[#1a3f7a] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Best Seller!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 p-4">
              <div className="w-12 h-12 bg-[#1a3f7a]/10 rounded-xl flex items-center justify-center">
                <Truck size={24} className="text-[#1a3f7a]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">Gratis Ongkir</p>
                <p className="text-xs text-gray-500">Min. pembelian 300rb</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <div className="w-12 h-12 bg-[#1a3f7a]/10 rounded-xl flex items-center justify-center">
                <Shield size={24} className="text-[#1a3f7a]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">Garansi Resmi</p>
                <p className="text-xs text-gray-500">100% original</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <div className="w-12 h-12 bg-[#1a3f7a]/10 rounded-xl flex items-center justify-center">
                <Star size={24} className="text-[#1a3f7a]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">Rating 4.8</p>
                <p className="text-xs text-gray-500">500+ review positif</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4">
              <div className="w-12 h-12 bg-[#1a3f7a]/10 rounded-xl flex items-center justify-center">
                <Award size={24} className="text-[#1a3f7a]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">Premium</p>
                <p className="text-xs text-gray-500">Bahan beludru terbaik</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Kategori Produk</h2>
            <p className="text-gray-500 max-w-md mx-auto">Temukan songkok impian Anda dari berbagai kategori yang kami sediakan</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Polos', emoji: '⚫', desc: 'Simpel & Elegan' },
              { name: 'Border', emoji: '✨', desc: 'Bordir Premium' },
              { name: 'Laser', emoji: '🔷', desc: 'Presisi Tinggi' },
              { name: 'Susun', emoji: '🎭', desc: 'Klasik Modern' },
            ].map(cat => (
              <Link
                key={cat.name}
                to={`/catalog?category=${cat.name}`}
                className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:border-[#1a3f7a] hover:shadow-lg transition-all text-center"
              >
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="font-bold text-gray-800 group-hover:text-[#1a3f7a] transition-colors">{cat.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Produk Unggulan</h2>
              <p className="text-gray-500">Koleksi terbaik pilihan pelanggan kami</p>
            </div>
            <Link to="/catalog" className="hidden md:flex items-center gap-1 text-[#1a3f7a] font-medium hover:underline">
              Lihat Semua <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/catalog" className="inline-flex items-center gap-1 text-[#1a3f7a] font-medium">
              Lihat Semua Produk <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1a3f7a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tampil Berkelas dengan Songkok Awing</h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pelanggan puas kami. Dapatkan songkok premium dengan kualitas terbaik dan harga terjangkau.
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-white text-[#1a3f7a] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Belanja Sekarang
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
