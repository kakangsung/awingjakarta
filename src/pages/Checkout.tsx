import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Truck, MapPin, Check, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('jne');
  const [paymentMethod, setPaymentMethod] = useState('transfer');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const shippingCosts: Record<string, { cost: number; days: string }> = {
    instant: { cost: 25000, days: '1-2 jam' },
    jne: { cost: 15000, days: '2-3 hari' },
    jt: { cost: 12000, days: '3-4 hari' },
  };

  const shippingCost = cartTotal >= 300000 ? 0 : shippingCosts[shippingMethod].cost;
  const grandTotal = cartTotal + shippingCost;

  const handlePlaceOrder = () => {
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Pesanan Berhasil!</h2>
          <p className="text-gray-500 mb-2">Terima kasih atas pesanan Anda.</p>
          <p className="text-sm text-gray-400 mb-6">
            Nomor pesanan: <span className="font-mono font-bold text-[#1a3f7a]">#AWG{Date.now().toString().slice(-6)}</span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Kami akan mengirimkan konfirmasi ke email Anda. Silakan lakukan pembayaran dalam 24 jam.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/catalog" className="bg-[#1a3f7a] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#15335f] transition-colors">
              Lanjut Belanja
            </Link>
            <Link to="/" className="text-[#1a3f7a] font-medium hover:underline">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Kosong</h2>
          <p className="text-gray-500 mb-6">Tambahkan produk ke keranjang terlebih dahulu</p>
          <Link to="/catalog" className="bg-[#1a3f7a] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#15335f]">
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
          <Link to="/cart" className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-2">
            <ArrowLeft size={16} /> Kembali ke Keranjang
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center mb-10">
          {['Pengiriman', 'Pembayaran', 'Konfirmasi'].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`flex items-center gap-2 ${step > i + 1 ? 'text-green-600' : step === i + 1 ? 'text-[#1a3f7a]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step > i + 1 ? 'bg-green-100 text-green-600' : step === i + 1 ? 'bg-[#1a3f7a] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > i + 1 ? <Check size={16} /> : i + 1}
                </div>
                <span className="text-sm font-medium hidden sm:block">{label}</span>
              </div>
              {i < 2 && <div className={`w-12 md:w-24 h-0.5 mx-2 ${step > i + 1 ? 'bg-green-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 text-lg mb-6 flex items-center gap-2">
                  <MapPin size={20} className="text-[#1a3f7a]" /> Alamat Pengiriman
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a]" placeholder="Nama lengkap" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                    <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a]" placeholder="08xxxxxxxxxx" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                    <textarea className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a] h-24 resize-none" placeholder="Jalan, RT/RW, Kelurahan, Kecamatan" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a]" placeholder="Kota" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a]" placeholder="Kode pos" />
                  </div>
                </div>

                <h3 className="font-bold text-gray-800 text-lg mt-8 mb-4 flex items-center gap-2">
                  <Truck size={20} className="text-[#1a3f7a]" /> Metode Pengiriman
                </h3>
                <div className="space-y-3">
                  {Object.entries(shippingCosts).map(([key, val]) => (
                    <label key={key} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      shippingMethod === key ? 'border-[#1a3f7a] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={key}
                          checked={shippingMethod === key}
                          onChange={e => setShippingMethod(e.target.value)}
                          className="w-4 h-4 text-[#1a3f7a]"
                        />
                        <div>
                          <p className="font-medium text-gray-800 uppercase">{key}</p>
                          <p className="text-xs text-gray-500">Estimasi: {val.days}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#1a3f7a]">{formatPrice(val.cost)}</span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full bg-[#1a3f7a] text-white py-4 rounded-xl font-semibold hover:bg-[#15335f] transition-colors"
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 text-lg mb-6 flex items-center gap-2">
                  <CreditCard size={20} className="text-[#1a3f7a]" /> Metode Pembayaran
                </h3>
                <div className="space-y-3">
                  {[
                    { id: 'transfer', label: 'Transfer Bank', desc: 'BCA, BNI, BRI, Mandiri' },
                    { id: 'ewallet', label: 'E-Wallet', desc: 'GoPay, OVO, DANA, ShopeePay' },
                    { id: 'cod', label: 'Bayar di Tempat (COD)', desc: 'Bayar saat barang diterima' },
                  ].map(method => (
                    <label key={method.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id ? 'border-[#1a3f7a] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-[#1a3f7a]"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{method.label}</p>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-200 text-gray-600 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-[#1a3f7a] text-white py-4 rounded-xl font-semibold hover:bg-[#15335f] transition-colors"
                  >
                    Konfirmasi Pesanan
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 text-lg mb-6">Konfirmasi Pesanan</h3>
                
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={`${item.product.id}-${item.size}-${item.height}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🕌</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-800 truncate">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Ukuran: {item.size} | Tinggi: {item.height}cm | Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm text-[#1a3f7a]">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border-2 border-gray-200 text-gray-600 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-[#1a3f7a] text-white py-4 rounded-xl font-semibold hover:bg-[#15335f] transition-colors"
                  >
                    Bayar {formatPrice(grandTotal)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">Ringkasan</h3>
              <div className="space-y-2 mb-4">
                {cart.map(item => (
                  <div key={`${item.product.id}-${item.size}-${item.height}`} className="flex justify-between text-sm">
                    <span className="text-gray-500 truncate mr-2">{item.product.name} x{item.quantity}</span>
                    <span className="font-medium shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Pengiriman ({shippingMethod.toUpperCase()})</span>
                  <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                    {shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-[#1a3f7a] text-lg">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
