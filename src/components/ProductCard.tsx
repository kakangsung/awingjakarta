import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { toggleWishlist, isInWishlist } = useStore();
  const wished = isInWishlist(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-300">
            <div className="text-center p-4">
              <div className="w-24 h-24 mx-auto bg-[#1a3f7a] rounded-full flex items-center justify-center mb-3 opacity-80">
                <span className="text-white text-3xl">🕌</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">{product.category}</p>
            </div>
          </div>
        </Link>
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            wished ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
        </button>
        <div className="absolute top-3 left-3">
          <span className="bg-[#1a3f7a] text-white text-xs px-2 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-[#1a3f7a] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-600">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-bold text-[#1a3f7a] text-sm">{formatPrice(product.price)}</p>
          <Link
            to={`/product/${product.id}`}
            className="p-2 bg-[#1a3f7a] text-white rounded-lg hover:bg-[#15335f] transition-colors"
          >
            <ShoppingCart size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
