import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Save } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { categories } from '../../data/products';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useAdmin();
  const isEdit = Boolean(id);

  const existingProduct = isEdit ? products.find(p => p.id === Number(id)) : null;

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    category: 'Polos',
    image: '',
    sizes: [] as number[],
    heights: [] as number[],
    inStock: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name,
        price: existingProduct.price,
        description: existingProduct.description,
        category: existingProduct.category,
        image: existingProduct.image,
        sizes: existingProduct.sizes,
        heights: existingProduct.heights,
        inStock: existingProduct.inStock,
      });
    }
  }, [existingProduct]);

  const allSizes = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const allHeights = [8, 9, 10, 11, 12];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Ukuran file maksimal 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
        setErrors(prev => ({ ...prev, image: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSize = (size: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size].sort((a, b) => a - b),
    }));
  };

  const toggleHeight = (height: number) => {
    setFormData(prev => ({
      ...prev,
      heights: prev.heights.includes(height)
        ? prev.heights.filter(h => h !== height)
        : [...prev.heights, height].sort((a, b) => a - b),
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Nama produk wajib diisi';
    if (formData.price <= 0) newErrors.price = 'Harga harus lebih dari 0';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi wajib diisi';
    if (formData.sizes.length === 0) newErrors.sizes = 'Pilih minimal 1 ukuran';
    if (formData.heights.length === 0) newErrors.heights = 'Pilih minimal 1 tinggi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEdit && id) {
      updateProduct(Number(id), formData);
    } else {
      addProduct(formData);
    }
    navigate('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/products')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h1>
          <p className="text-gray-500 text-sm">
            {isEdit ? 'Perbarui informasi produk' : 'Isi detail produk yang ingin ditambahkan'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Informasi Dasar</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a] ${
                  errors.name ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Contoh: Songkok Awing AC Hitam"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harga (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a] ${
                    errors.price ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="132500"
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a]"
                >
                  {categories.filter(c => c !== 'Semua').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a] resize-none ${
                  errors.description ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Deskripsikan produk Anda secara detail..."
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="inStock"
                checked={formData.inStock}
                onChange={e => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                className="w-4 h-4 text-[#1a3f7a] rounded"
              />
              <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                Produk tersedia (in stock)
              </label>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Gambar Produk</h3>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#1a3f7a] transition-colors">
            {formData.image ? (
              <div className="relative inline-block">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="max-h-48 rounded-lg mx-auto"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <Upload size={40} className="text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Klik untuk upload gambar
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG (maks. 2MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {errors.image && <p className="text-red-500 text-xs mt-2">{errors.image}</p>}
          <p className="text-xs text-gray-500 mt-2">💡 Tip: Anda juga bisa paste URL gambar langsung jika tidak ingin upload file.</p>
          <input
            type="text"
            value={formData.image.startsWith('data:') ? '' : formData.image}
            onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
            className="w-full mt-3 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3f7a]/20 focus:border-[#1a3f7a]"
            placeholder="Atau paste URL gambar di sini..."
          />
        </div>

        {/* Sizes */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Ukuran Tersedia</h3>
          <div className="flex flex-wrap gap-2">
            {allSizes.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-12 h-12 rounded-xl border-2 text-sm font-medium transition-all ${
                  formData.sizes.includes(size)
                    ? 'border-[#1a3f7a] bg-[#1a3f7a] text-white'
                    : 'border-gray-200 text-gray-600 hover:border-[#1a3f7a]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.sizes && <p className="text-red-500 text-xs mt-2">{errors.sizes}</p>}
          <p className="text-xs text-gray-500 mt-2">Ukuran songkok (lingkar kepala dalam cm)</p>
        </div>

        {/* Heights */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">Tinggi Tersedia</h3>
          <div className="flex flex-wrap gap-2">
            {allHeights.map(height => (
              <button
                key={height}
                type="button"
                onClick={() => toggleHeight(height)}
                className={`px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  formData.heights.includes(height)
                    ? 'border-[#1a3f7a] bg-[#1a3f7a] text-white'
                    : 'border-gray-200 text-gray-600 hover:border-[#1a3f7a]'
                }`}
              >
                {height} cm
              </button>
            ))}
          </div>
          {errors.heights && <p className="text-red-500 text-xs mt-2">{errors.heights}</p>}
          <p className="text-xs text-gray-500 mt-2">Tinggi songkok dalam cm</p>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="flex-1 py-4 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#1a3f7a] text-white rounded-xl font-semibold hover:bg-[#15335f] transition-colors"
          >
            <Save size={20} />
            {isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}
          </button>
        </div>
      </form>
    </div>
  );
}
