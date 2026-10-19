import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, user } = useStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/catalog', label: 'Katalog' },
    { path: '/about', label: 'Tentang Kami' },
    { path: '/contact', label: 'Kontak' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1a3f7a] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-[#1a3f7a] leading-tight">Awing Jakarta</h1>
              <p className="text-[10px] text-gray-500 leading-tight">Songkok Premium</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-[#1a3f7a] border-b-2 border-[#1a3f7a] pb-1'
                    : 'text-gray-600 hover:text-[#1a3f7a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link to="/catalog" className="p-2 text-gray-600 hover:text-[#1a3f7a] transition-colors">
              <Search size={20} />
            </Link>
            <Link to="/wishlist" className="p-2 text-gray-600 hover:text-[#1a3f7a] transition-colors relative">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="p-2 text-gray-600 hover:text-[#1a3f7a] transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1a3f7a] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/login" className="p-2 text-gray-600 hover:text-[#1a3f7a] transition-colors">
              <User size={20} />
              {user && <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 px-4 rounded-lg text-sm font-medium ${
                isActive(link.path)
                  ? 'text-[#1a3f7a] bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
