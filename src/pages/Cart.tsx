import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const shippingCost = cartTotal >= 300000 ? 0 : 15000;
  const grandTotal = cartTotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Kosong</h2>
          <p className="text-gray-500 mb-6">Belum ada produk di keranjang belanja Anda</p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-[#1a3f7a] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#15335f] transition-colors"
          >
            Mulai Belanja <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1a3f7a] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Keranjang Belanja</h1>
          <p className="text-blue-200 mt-1">{cart.length} item di keranjang Anda</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.size}-${item.height}`} className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-3xl">🕌</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`} className="font-semibold text-gray-800 hover:text-[#1a3f7a] transition-colors line-clamp-1">
                      {item.product.name}
                    </Link>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Ukuran: {item.size}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Tinggi: {item.height}cm</span>
                    </div>
                    <p className="font-bold text-[#1a3f7a] mt-2">{formatPrice(item.product.price)}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size, item.height)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.height, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#1a3f7a] transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.height, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-[#1a3f7a] transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-gray-800 text-lg mb-4">Ringkasan Pesanan</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} item)</span>
                  <span className="font-medium">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ongkos Kirim</span>
                  <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : ''}`}>
                    {shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded-lg">
                    💡 Belanja min. Rp 300.000 untuk gratis ongkir
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-xl text-[#1a3f7a]">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-[#1a3f7a] text-white py-4 rounded-xl font-semibold hover:bg-[#15335f] transition-colors"
              >
                Checkout <ArrowRight size={18} />
              </Link>

              <Link
                to="/catalog"
                className="w-full flex items-center justify-center gap-2 mt-3 text-[#1a3f7a] font-medium py-3 hover:underline"
              >
                Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
