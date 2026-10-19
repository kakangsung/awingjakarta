import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, ChevronLeft, Check } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedHeight, setSelectedHeight] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Produk tidak ditemukan</h2>
          <Link to="/catalog" className="text-[#1a3f7a] hover:underline">Kembali ke Katalog</Link>
        </div>
      </div>
    );
  }

  const wished = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedHeight) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedHeight);
    }
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#1a3f7a]">Beranda</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-[#1a3f7a]">Katalog</Link>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#1a3f7a] mb-6">
          <ChevronLeft size={16} /> Kembali ke Katalog
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl aspect-square flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-40 h-40 mx-auto bg-[#1a3f7a] rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-6xl">🕌</span>
              </div>
              <p className="text-sm text-gray-500 font-medium">{product.category}</p>
              <p className="text-xs text-gray-400 mt-1">Songkok Awing Jakarta</p>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <span className="bg-[#1a3f7a]/10 text-[#1a3f7a] text-xs font-medium px-3 py-1 rounded-full">
                {product.category}
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 rounded-full transition-all ${
                  wished ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart size={20} fill={wished ? 'currentColor' : 'none'} />
              </button>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating}</span>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm text-gray-500">{product.reviews} ulasan</span>
            </div>

            <p className="text-3xl font-bold text-[#1a3f7a] mb-6">{formatPrice(product.price)}</p>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Ukuran: {selectedSize && <span className="text-[#1a3f7a]">{selectedSize}</span>}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'border-[#1a3f7a] bg-[#1a3f7a] text-white'
                        : 'border-gray-200 text-gray-600 hover:border-[#1a3f7a]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Height Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Tinggi: {selectedHeight && <span className="text-[#1a3f7a]">{selectedHeight} cm</span>}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.heights.map(height => (
                  <button
                    key={height}
                    onClick={() => setSelectedHeight(height)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedHeight === height
                        ? 'border-[#1a3f7a] bg-[#1a3f7a] text-white'
                        : 'border-gray-200 text-gray-600 hover:border-[#1a3f7a]'
                    }`}
                  >
                    {height} cm
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-3">Jumlah</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-[#1a3f7a] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-[#1a3f7a] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedHeight}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                  showAdded
                    ? 'bg-green-500 text-white'
                    : !selectedSize || !selectedHeight
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#1a3f7a] text-white hover:bg-[#15335f]'
                }`}
              >
                {showAdded ? (
                  <><Check size={20} /> Ditambahkan!</>
                ) : (
                  <><ShoppingCart size={20} /> Masukkan Keranjang</>
                )}
              </button>
            </div>

            {!selectedSize || !selectedHeight ? (
              <p className="text-xs text-orange-500 mt-2">* Pilih ukuran dan tinggi terlebih dahulu</p>
            ) : null}

            {/* Features */}
            <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-[#1a3f7a]" />
                <span className="text-xs text-gray-600">Gratis ongkir min. 300rb</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-[#1a3f7a]" />
                <span className="text-xs text-gray-600">Garansi 100% original</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ulasan Pelanggan</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Ahmad S.', rating: 5, text: 'Kualitas luar biasa! Bahan sangat lembut dan nyaman dipakai seharian.' },
              { name: 'Budi R.', rating: 5, text: 'Sesuai deskripsi, pengiriman cepat. Pasti order lagi!' },
              { name: 'Hasan M.', rating: 4, text: 'Bagus, cuma ukurannya agak kecil. Saran: pilih 1 size lebih besar.' },
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className={j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-3">{review.text}</p>
                <p className="text-xs font-medium text-gray-800">{review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Produk Serupa</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
