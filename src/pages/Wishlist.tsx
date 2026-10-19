import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useStore();
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Wishlist Kosong</h2>
          <p className="text-gray-500 mb-6">Belum ada produk di wishlist Anda</p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-[#1a3f7a] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#15335f] transition-colors"
          >
            Lihat Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1a3f7a] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Wishlist Saya</h1>
          <p className="text-blue-200 mt-1">{wishlistProducts.length} produk tersimpan</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-[#1a3f7a] rounded-full flex items-center justify-center mb-2">
                    <span className="text-white text-3xl">🕌</span>
                  </div>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-red-50 text-red-500 rounded-full"
                >
                  <Heart size={18} fill="currentColor" />
                </button>
              </div>
              <div className="p-4">
                <Link to={`/product/${product.id}`} className="font-semibold text-gray-800 hover:text-[#1a3f7a] transition-colors line-clamp-1">
                  {product.name}
                </Link>
                <p className="font-bold text-[#1a3f7a] mt-2 mb-3">{formatPrice(product.price)}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#1a3f7a] text-white py-3 rounded-xl font-medium hover:bg-[#15335f] transition-colors text-sm"
                >
                  <ShoppingCart size={16} /> Lihat Produk
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
