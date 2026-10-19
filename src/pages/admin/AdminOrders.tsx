import { useState } from 'react';
import { Package, Eye, Filter } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useAdmin();
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    processing: 'bg-blue-100 text-blue-700 border-blue-200',
    shipped: 'bg-purple-100 text-purple-700 border-purple-200',
    completed: 'bg-green-100 text-green-700 border-green-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  };

  const statusLabels = {
    pending: 'Menunggu',
    processing: 'Diproses',
    shipped: 'Dikirim',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status === statusFilter);

  const selectedOrderData = orders.find(o => o.id === selectedOrder);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Pesanan</h1>
        <p className="text-gray-500 text-sm">{orders.length} total pesanan</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter size={18} className="text-gray-400" />
          <span className="text-sm text-gray-600">Filter:</span>
          {['all', 'pending', 'processing', 'shipped', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                statusFilter === status
                  ? 'bg-[#1a3f7a] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'Semua' : statusLabels[status as keyof typeof statusLabels]}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Package size={24} className="text-gray-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{order.id}</p>
                  <p className="text-xs text-gray-500">{order.date} • {order.customer.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full font-medium border ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
                <button
                  onClick={() => setSelectedOrder(order.id)}
                  className="p-2 text-[#1a3f7a] hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs mb-1">Items</p>
                <p className="font-medium text-gray-800">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)} produk
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Total</p>
                <p className="font-bold text-[#1a3f7a]">{formatPrice(order.total)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Pengiriman</p>
                <p className="font-medium text-gray-800 uppercase">{order.shipping}</p>
              </div>
            </div>

            {/* Status Update */}
            {order.status !== 'completed' && order.status !== 'cancelled' && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Ubah Status:</p>
                <div className="flex flex-wrap gap-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'processing')}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors"
                    >
                      Proses Pesanan
                    </button>
                  )}
                  {order.status === 'processing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'shipped')}
                      className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 transition-colors"
                    >
                      Tandai Dikirim
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                    >
                      Tandai Selesai
                    </button>
                  )}
                  <button
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                  >
                    Batalkan
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-500">Tidak ada pesanan ditemukan</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrderData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Detail Pesanan</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Informasi Pesanan</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">ID Pesanan</p>
                    <p className="font-medium">{selectedOrderData.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Tanggal</p>
                    <p className="font-medium">{selectedOrderData.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Status</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[selectedOrderData.status]}`}>
                      {statusLabels[selectedOrderData.status]}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Pembayaran</p>
                    <p className="font-medium uppercase">{selectedOrderData.payment}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Informasi Pelanggan</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Nama</p>
                    <p className="font-medium">{selectedOrderData.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Email</p>
                    <p className="font-medium">{selectedOrderData.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Telepon</p>
                    <p className="font-medium">{selectedOrderData.customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Alamat</p>
                    <p className="font-medium">{selectedOrderData.customer.address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Produk Dipesan</h4>
                <div className="space-y-3">
                  {selectedOrderData.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🕌</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800">{item.product.name}</p>
                        <p className="text-xs text-gray-500">
                          Ukuran: {item.size} | Tinggi: {item.height}cm | Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-sm text-[#1a3f7a]">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-lg text-[#1a3f7a]">{formatPrice(selectedOrderData.total)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-6 py-3 bg-[#1a3f7a] text-white rounded-xl font-semibold hover:bg-[#15335f] transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
