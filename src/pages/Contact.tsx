import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a3f7a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Hubungi Kami</h1>
          <p className="text-blue-200">Kami siap membantu Anda. Jangan ragu untuk menghubungi kami.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Informasi Kontak</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#1a3f7a]/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-[#1a3f7a]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Alamat Toko</p>
                    <p className="text-gray-500 text-sm">Jl. Raya Songkok No. 123, RT 05/RW 02, Kelurahan Pasar Baru, Kecamatan Sawah Besar, Jakarta Pusat, DKI Jakarta 10110</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#1a3f7a]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-[#1a3f7a]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Telepon / WhatsApp</p>
                    <p className="text-gray-500 text-sm">+62 812-3456-7890</p>
                    <p className="text-gray-500 text-sm">+62 21-3456-7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#1a3f7a]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-[#1a3f7a]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Email</p>
                    <p className="text-gray-500 text-sm">info@awningjakarta.com</p>
                    <p className="text-gray-500 text-sm">order@awningjakarta.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#1a3f7a]/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-[#1a3f7a]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Jam Operasional</p>
                    <p className="text-gray-500 text-sm">Senin - Sabtu: 08.00 - 20.00 WIB</p>
                    <p className="text-gray-500 text-sm">Minggu: 09.00 - 17.00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Media Sosial</h3>
              <div className="flex gap-3">
                <a href="#" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  <Instagram size={16} /> Instagram
                </a>
                <a href="#" className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Kirim Pesan</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a]" placeholder="Nama Anda" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a]" placeholder="email@contoh.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a]" placeholder="Subjek pesan" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                  <textarea className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a] h-32 resize-none" placeholder="Tulis pesan Anda di sini..." />
                </div>
                <button type="button" className="bg-[#1a3f7a] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#15335f] transition-colors">
                  Kirim Pesan
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-[#1a3f7a]" /> Lokasi Toko Kami
              </h3>
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.164687195531831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonumen%20Nasional!5e0!3m2!1sen!2sid!4v1635760000000!5m2!1sen!2sid"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Awing Jakarta"
                ></iframe>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                📍 Jl. Raya Songkok No. 123, Jakarta Pusat, 10110
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
