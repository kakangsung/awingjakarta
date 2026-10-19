import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout, user } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(email.split('@')[0] || 'User', email);
    } else {
      login(name, email);
    }
    navigate('/');
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#1a3f7a] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Halo, {user.name}!</h2>
          <p className="text-gray-500 mb-6">{user.email}</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-[#1a3f7a] text-white py-3 rounded-xl font-semibold hover:bg-[#15335f] transition-colors"
            >
              Mulai Belanja
            </button>
            <button
              onClick={() => { logout(); }}
              className="w-full border-2 border-red-200 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-50 transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#1a3f7a] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isLogin ? 'Selamat datang kembali!' : 'Buat akun untuk mulai berbelanja'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a]"
                placeholder="Nama lengkap Anda"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a]"
              placeholder="email@contoh.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a] pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-[#1a3f7a] hover:underline">
                Lupa password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#1a3f7a] text-white py-3 rounded-xl font-semibold hover:bg-[#15335f] transition-colors"
          >
            {isLogin ? 'Masuk' : 'Daftar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#1a3f7a] font-medium ml-1 hover:underline"
            >
              {isLogin ? 'Daftar sekarang' : 'Masuk di sini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
