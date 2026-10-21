import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Search, ChevronDown, MapPin, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { categories } from '../data/products';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { cartCount, user } = useStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Beranda' },
    {
      path: '/catalog',
      label: 'Produk',
      dropdown: true,
      items: [
        { label: 'Semua Produk', path: '/catalog', icon: '🕌' },
        { label: 'Polos', path: '/catalog?category=Polos', icon: '⚫' },
        { label: 'Border', path: '/catalog?category=Border', icon: '✨' },
        { label: 'Laser', path: '/catalog?category=Laser', icon: '🔷' },
        { label: 'Susun', path: '/catalog?category=Susun', icon: '🎭' },
      ]
    },
    { path: '/about', label: 'Tentang Kami' },
    { path: '/contact', label: 'Kontak' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#0f2847] text-white text-xs py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-blue-200">
              <Phone size={12} />
              +62 812-3456-7890
            </span>
            <span className="flex items-center gap-1.5 text-blue-200">
              <MapPin size={12} />
              Jakarta Pusat
            </span>
          </div>
          <div className="flex items-center gap-4 mx-auto md:mx-0">
            <span className="text-yellow-300 font-medium animate-pulse">🔥 GRATIS ONGKIR min. Rp 300.000</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-blue-200 hover:text-white transition-colors">
              {user ? `Halo, ${user.name}` : 'Masuk / Daftar'}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[#1a3f7a] to-[#0f2847] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <span className="text-white font-black text-xl">A</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-[#1a3f7a] leading-tight tracking-tight">AWING</h1>
                <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase leading-tight">Jakarta • Premium</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all rounded-lg ${
                      isActive(link.path)
                        ? 'text-[#1a3f7a] bg-[#1a3f7a]/5'
                        : 'text-gray-700 hover:text-[#1a3f7a] hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-2">
                        {link.items?.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#1a3f7a]/5 hover:text-[#1a3f7a] transition-all group/item"
                          >
                            <span className="text-xl group-hover/item:scale-110 transition-transform">{item.icon}</span>
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="bg-gradient-to-r from-[#1a3f7a] to-[#0f2847] p-4 text-white">
                        <p className="text-xs font-medium opacity-80">Koleksi Terbaru</p>
                        <p className="text-sm font-bold">Songkok Premium 2024</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-gray-600 hover:text-[#1a3f7a] hover:bg-gray-100 rounded-xl transition-all"
              >
                <Search size={22} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="hidden sm:flex p-2.5 text-gray-600 hover:text-[#1a3f7a] hover:bg-gray-100 rounded-xl transition-all relative"
              >
                <Heart size={22} />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2.5 text-gray-600 hover:text-[#1a3f7a] hover:bg-gray-100 rounded-xl transition-all relative"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              <Link
                to="/login"
                className="hidden sm:flex p-2.5 text-gray-600 hover:text-[#1a3f7a] hover:bg-gray-100 rounded-xl transition-all"
              >
                <User size={22} />
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-gray-50 py-4 px-4 animate-in slide-in-from-top duration-200">
            <div className="max-w-3xl mx-auto relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari songkok, peci, koleksi premium..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a] shadow-sm"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1a3f7a] to-[#0f2847] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <span className="font-black text-[#1a3f7a]">AWING</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="relative mb-6">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20"
                />
              </div>

              {/* Mobile Links */}
              <nav className="space-y-1">
                {navLinks.map(link => (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-semibold ${
                        isActive(link.path)
                          ? 'text-[#1a3f7a] bg-[#1a3f7a]/5'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                      {link.dropdown && <ChevronDown size={16} />}
                    </Link>
                    {link.dropdown && (
                      <div className="pl-4 space-y-1 mt-1">
                        {link.items?.map(item => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
                          >
                            <span>{item.icon}</span>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                <Link
                  to="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                >
                  <Heart size={20} /> Wishlist
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
                >
                  <User size={20} /> {user ? 'Akun Saya' : 'Masuk / Daftar'}
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#1a3f7a] text-white font-semibold"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingCart size={20} /> Keranjang
                  </span>
                  {cartCount > 0 && (
                    <span className="bg-white text-[#1a3f7a] text-xs px-2 py-1 rounded-full font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
