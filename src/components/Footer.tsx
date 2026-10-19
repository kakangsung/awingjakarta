import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#1a3f7a] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Awing Jakarta</h3>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Menyediakan berbagai varian songkok premium berkualitas tinggi untuk tampilan berkelas Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Menu</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Beranda</Link></li>
              <li><Link to="/catalog" className="text-gray-400 hover:text-white text-sm transition-colors">Katalog</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">Tentang Kami</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Kategori</h4>
            <ul className="space-y-2">
              <li><Link to="/catalog?category=Polos" className="text-gray-400 hover:text-white text-sm transition-colors">Polos</Link></li>
              <li><Link to="/catalog?category=Border" className="text-gray-400 hover:text-white text-sm transition-colors">Border</Link></li>
              <li><Link to="/catalog?category=Laser" className="text-gray-400 hover:text-white text-sm transition-colors">Laser</Link></li>
              <li><Link to="/catalog?category=Susun" className="text-gray-400 hover:text-white text-sm transition-colors">Susun</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Jl. Raya Songkok No. 123, Jakarta Pusat, 10110</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={16} className="shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} className="shrink-0" />
                <span>info@awningjakarta.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Instagram size={16} className="shrink-0" />
                <span>@awningjakarta</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Awing Jakarta. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-gray-500 text-xs">Pengiriman:</span>
            <span className="text-gray-400 text-xs font-medium">JNE</span>
            <span className="text-gray-400 text-xs font-medium">J&T</span>
            <span className="text-gray-400 text-xs font-medium">Instant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
