import { Award, Users, Target, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a3f7a] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Awing Jakarta</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Menyediakan berbagai varian songkok premium berkualitas tinggi untuk tampilan berkelas Anda
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-[#1a3f7a] font-semibold text-sm uppercase tracking-wider">Cerita Kami</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-6">Perjalanan Awing Jakarta</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Awing Jakarta didirikan dengan visi untuk menyediakan songkok berkualitas premium dengan harga terjangkau bagi seluruh masyarakat Indonesia.
              </p>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Kami percaya bahwa setiap pria Muslim berhak mendapatkan songkok yang tidak hanya nyaman, tetapi juga elegan dan tahan lama.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Dengan pengalaman lebih dari 10 tahun dalam industri songkok, kami terus berinovasi untuk memberikan produk terbaik.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#1a3f7a] to-[#0f2847] rounded-2xl p-12 text-center text-white">
            <div className="text-7xl mb-4">🕌</div>
            <h3 className="text-2xl font-bold mb-2">Sejak 2014</h3>
            <p className="text-blue-200">Melayani dengan sepenuh hati</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { number: '10+', label: 'Tahun Pengalaman' },
            { number: '50K+', label: 'Pelanggan Puas' },
            { number: '100+', label: 'Varian Produk' },
            { number: '4.8', label: 'Rating Rata-rata' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <p className="text-3xl md:text-4xl font-bold text-[#1a3f7a]">{stat.number}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Nilai-Nilai Kami</h2>
            <p className="text-gray-500 max-w-md mx-auto">Prinsip yang kami pegang dalam setiap produk dan layanan</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Kualitas Premium', desc: 'Menggunakan bahan beludru terbaik tanpa kompromi' },
              { icon: Users, title: 'Pelanggan Pertama', desc: 'Kepuasan pelanggan adalah prioritas utama kami' },
              { icon: Target, title: 'Presisi', desc: 'Setiap detail dikerjakan dengan teliti dan presisi' },
              { icon: Heart, title: 'Passion', desc: 'Kami mencintai apa yang kami kerjakan setiap hari' },
            ].map((value, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-[#1a3f7a]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon size={28} className="text-[#1a3f7a]" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-500">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#1a3f7a] to-[#0f2847] rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Tertarik dengan produk kami?</h2>
          <p className="text-blue-200 mb-8 max-w-lg mx-auto">
            Jelajahi koleksi songkok premium kami dan temukan yang paling cocok untuk Anda.
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-white text-[#1a3f7a] px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Lihat Katalog Produk
          </Link>
        </div>
      </div>
    </div>
  );
}
