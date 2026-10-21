import { Package, ShoppingCart, DollarSign, Clock, TrendingUp, Users, Upload } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { stats, orders, products } = useAdmin();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const recentOrders = orders.slice(0, 5);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  const statusLabels = {
    pending: 'Menunggu',
    processing: 'Diproses',
    shipped: 'Dikirim',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
  };

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Selamat Datang, Admin!</h1>
        <p className="text-gray-500">Berikut ringkasan toko Awing Jakarta hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package size={24} className="text-[#1a3f7a]" />
            </div>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.totalProducts}</p>
          <p className="text-sm text-gray-500">Total Produk</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign size={24} className="text-green-600" />
            </div>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800">{formatPrice(stats.totalRevenue)}</p>
          <p className="text-sm text-gray-500">Total Pendapatan</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <ShoppingCart size={24} className="text-purple-600" />
            </div>
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              +12%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
          <p className="text-sm text-gray-500">Total Pesanan</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
            <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
              Perlu aksi
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.pendingOrders}</p>
          <p className="text-sm text-gray-500">Pesanan Pending</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Pesanan Terbaru</h3>
            <Link to="/admin/orders" className="text-sm text-[#1a3f7a] hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentOrders.map(order => (
              <div key={order.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart size={18} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.customer.name} • {order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 text-sm">{formatPrice(order.total)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Aksi Cepat</h3>
            <div className="space-y-3">
              <Link
                to="/admin/products/import"
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#1a3f7a] to-[#2a5298] text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                <Upload size={20} />
                <span className="font-medium text-sm">Import Produk Massal</span>
              </Link>
              <Link
                to="/admin/products/new"
                className="flex items-center gap-3 p-3 bg-[#1a3f7a] text-white rounded-xl hover:bg-[#15335f] transition-colors"
              >
                <Package size={20} />
                <span className="font-medium text-sm">Tambah Produk Baru</span>
              </Link>
              <Link
                to="/admin/products"
                className="flex items-center gap-3 p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Package size={20} />
                <span className="font-medium text-sm">Kelola Produk</span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-3 p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <ShoppingCart size={20} />
                <span className="font-medium text-sm">Kelola Pesanan</span>
              </Link>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Produk Terlaris</h3>
            <div className="space-y-3">
              {products.slice(0, 3).map((product, i) => (
                <div key={product.id} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-300 w-6">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{formatPrice(product.price)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{product.reviews}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
