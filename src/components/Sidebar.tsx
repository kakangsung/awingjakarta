import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Plus,
  Tags,
  Archive,
  ShoppingCart,
  Clock,
  Truck,
  CheckCircle,
  History,
  Users,
  Percent,
  Settings,
  Building2,
  CreditCard,
  TruckIcon,
  Globe,
  LogOut,
  ChevronDown,
  Menu,
  X,
  User,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface MenuItem {
  label: string;
  path?: string;
  icon: any;
  badge?: string | number;
  children?: { label: string; path: string; icon: any; badge?: string | number }[];
}

export default function Sidebar() {
  const location = useLocation();
  const { adminLogout, stats } = useAdmin();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['produk', 'pesanan', 'pengaturan']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (children: any[]) => children.some(child => isActive(child.path));

  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Manajemen Produk',
      icon: Package,
      children: [
        { label: 'Semua Produk', path: '/admin/products', icon: Package },
        { label: 'Tambah Produk Baru', path: '/admin/products/new', icon: Plus },
        { label: 'Import Massal', path: '/admin/products/import', icon: Archive, badge: 'NEW' },
        { label: 'Kategori Produk', path: '/admin/categories', icon: Tags },
        { label: 'Manajemen Stok', path: '/admin/stock', icon: Archive },
      ],
    },
    {
      label: 'Pesanan & Transaksi',
      icon: ShoppingCart,
      badge: stats.pendingOrders,
      children: [
        { label: 'Pesanan Baru', path: '/admin/orders?status=pending', icon: Clock, badge: stats.pendingOrders },
        { label: 'Siap Dikirim', path: '/admin/orders?status=processing', icon: CheckCircle },
        { label: 'Dalam Pengiriman', path: '/admin/orders?status=shipped', icon: Truck },
        { label: 'Riwayat Selesai', path: '/admin/orders?status=completed', icon: History },
      ],
    },
    {
      label: 'Database Pelanggan',
      path: '/admin/customers',
      icon: Users,
    },
    {
      label: 'Promosi & Voucher',
      path: '/admin/promotions',
      icon: Percent,
    },
    {
      label: 'Pengaturan Toko',
      icon: Settings,
      children: [
        { label: 'Profil & Gudang', path: '/admin/settings/profile', icon: Building2 },
        { label: 'Integrasi Pembayaran', path: '/admin/settings/payment', icon: CreditCard },
        { label: 'Opsi Kurir & Ongkir', path: '/admin/settings/shipping', icon: TruckIcon },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">A</span>
              </div>
              <div>
                <h1 className="font-bold text-white text-sm leading-tight">Awing Jakarta</h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileOpen(false);
              } else {
                setCollapsed(!collapsed);
              }
            }}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Admin Profile */}
        {!collapsed && (
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Administrator</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item, index) => {
          const menuId = item.label.toLowerCase().replace(/\s+/g, '-');
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedMenus.includes(menuId);
          const parentActive = hasChildren && isParentActive(item.children!);

          return (
            <div key={index}>
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleMenu(menuId)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                      parentActive
                        ? 'bg-blue-500/20 text-white'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} className={parentActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'} />
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && (
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </div>
                    )}
                  </button>

                  {/* Sub-menu */}
                  {isExpanded && !collapsed && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-white/10 pl-4">
                      {item.children!.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          to={child.path}
                          onClick={() => window.innerWidth < 1024 && setMobileOpen(false)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all group ${
                            isActive(child.path)
                              ? 'bg-blue-500/20 text-white font-medium'
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <child.icon size={16} />
                            <span>{child.label}</span>
                          </div>
                          {child.badge && (
                            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center">
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path!}
                  onClick={() => window.innerWidth < 1024 && setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                    isActive(item.path!)
                      ? 'bg-blue-500/20 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className={isActive(item.path!) ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'} />
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {item.badge && !collapsed && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all group"
        >
          <Globe size={20} className="text-gray-400 group-hover:text-white" />
          {!collapsed && <span>Lihat Toko</span>}
        </Link>
        <button
          onClick={() => {
            adminLogout();
            window.location.href = '/admin/login';
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all group"
        >
          <LogOut size={20} className="group-hover:text-red-200" />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gray-900 text-white rounded-xl shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-950 text-white z-50 transition-all duration-300 ${
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        } ${collapsed ? 'lg:w-20' : 'lg:w-72'} w-72`}
      >
        {sidebarContent}
      </aside>

      {/* Spacer for collapsed state */}
      <div className={`hidden lg:block transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`} />
    </>
  );
}
