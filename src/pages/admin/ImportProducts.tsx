import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Download, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { Product } from '../../data/products';

interface ImportRow {
  line: number;
  data: {
    name: string;
    price: number;
    description: string;
    category: string;
    sizes: number[];
    heights: number[];
    inStock: boolean;
  };
  valid: boolean;
  errors: string[];
}

export default function ImportProducts() {
  const navigate = useNavigate();
  const { addProduct } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [importData, setImportData] = useState<ImportRow[]>([]);
  const [fileName, setFileName] = useState('');
  const [step, setStep] = useState<'upload' | 'preview' | 'complete'>('upload');
  const [importedCount, setImportedCount] = useState(0);

  const validCategories = ['Polos', 'Border', 'Laser', 'Susun'];
  const validSizes = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const validHeights = [8, 9, 10, 11, 12];

  const downloadTemplate = () => {
    const template = `name,price,description,category,sizes,heights,inStock
Songkok Awing AC Hitam,132500,Bahan Beludru Premium tanpa kertas,Polos,"3,4,5,6,7,8,9,10,11,12","8,9,10,11,12",true
Songkok Awing Border Gold,155000,Songkok premium dengan bordir emas,Border,"4,5,6,7,8,9,10,11","9,10,11,12",true
Songkok Awing Laser Navy,165000,Teknologi laser cutting presisi,Laser,"5,6,7,8,9,10","8,9,10,11",true`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_produk_awing.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const parseCSV = (text: string): ImportRow[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const results: ImportRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const row: ImportRow = {
        line: i + 1,
        data: {
          name: '',
          price: 0,
          description: '',
          category: '',
          sizes: [],
          heights: [],
          inStock: true,
        },
        valid: true,
        errors: [],
      };

      headers.forEach((header, index) => {
        const value = values[index]?.trim() || '';
        
        switch (header) {
          case 'name':
            row.data.name = value;
            break;
          case 'price':
            row.data.price = Number(value);
            break;
          case 'description':
            row.data.description = value;
            break;
          case 'category':
            row.data.category = value;
            break;
          case 'sizes':
            row.data.sizes = value.split(',').map(s => Number(s.trim())).filter(s => !isNaN(s));
            break;
          case 'heights':
            row.data.heights = value.split(',').map(h => Number(h.trim())).filter(h => !isNaN(h));
            break;
          case 'instock':
            row.data.inStock = value.toLowerCase() === 'true' || value === '1';
            break;
        }
      });

      // Validate
      if (!row.data.name) {
        row.valid = false;
        row.errors.push('Nama produk wajib diisi');
      }
      if (row.data.price <= 0) {
        row.valid = false;
        row.errors.push('Harga harus lebih dari 0');
      }
      if (!row.data.description) {
        row.valid = false;
        row.errors.push('Deskripsi wajib diisi');
      }
      if (!validCategories.includes(row.data.category)) {
        row.valid = false;
        row.errors.push(`Kategori tidak valid. Gunakan: ${validCategories.join(', ')}`);
      }
      if (row.data.sizes.length === 0) {
        row.valid = false;
        row.errors.push('Ukuran wajib diisi');
      } else {
        const invalidSizes = row.data.sizes.filter(s => !validSizes.includes(s));
        if (invalidSizes.length > 0) {
          row.valid = false;
          row.errors.push(`Ukuran tidak valid: ${invalidSizes.join(', ')}. Gunakan: ${validSizes.join(', ')}`);
        }
      }
      if (row.data.heights.length === 0) {
        row.valid = false;
        row.errors.push('Tinggi wajib diisi');
      } else {
        const invalidHeights = row.data.heights.filter(h => !validHeights.includes(h));
        if (invalidHeights.length > 0) {
          row.valid = false;
          row.errors.push(`Tinggi tidak valid: ${invalidHeights.join(', ')}. Gunakan: ${validHeights.join(', ')}`);
        }
      }

      results.push(row);
    }

    return results;
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    
    return result;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      alert('File harus berformat CSV');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCSV(text);
      setImportData(parsed);
      setStep('preview');
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    const validRows = importData.filter(row => row.valid);
    validRows.forEach(row => {
      addProduct({
        name: row.data.name,
        price: row.data.price,
        description: row.data.description,
        category: row.data.category,
        image: '',
        sizes: row.data.sizes,
        heights: row.data.heights,
        inStock: row.data.inStock,
      });
    });
    setImportedCount(validRows.length);
    setStep('complete');
  };

  const validCount = importData.filter(r => r.valid).length;
  const invalidCount = importData.filter(r => !r.valid).length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/products')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Import Produk Massal</h1>
          <p className="text-gray-500 text-sm">Upload banyak produk sekaligus via file CSV</p>
        </div>
      </div>

      {/* Step: Upload */}
      {step === 'upload' && (
        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <FileText size={20} />
              Panduan Import Produk
            </h3>
            <ol className="space-y-2 text-sm text-blue-800">
              <li>1. Download template CSV di bawah ini</li>
              <li>2. Isi data produk sesuai format (jangan ubah header)</li>
              <li>3. Upload file CSV yang sudah diisi</li>
              <li>4. Preview dan validasi data sebelum import</li>
              <li>5. Klik "Import" untuk menambahkan produk</li>
            </ol>
          </div>

          {/* Download Template */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">1. Download Template</h3>
            <p className="text-sm text-gray-600 mb-4">
              Download template CSV untuk melihat format yang benar. Template berisi contoh data yang bisa Anda edit.
            </p>
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center gap-2 bg-[#1a3f7a] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#15335f] transition-colors"
            >
              <Download size={20} />
              Download Template CSV
            </button>
          </div>

          {/* Format Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Format Kolom CSV</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Kolom</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Wajib</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Format</th>
                    <th className="text-left px-4 py-2 font-semibold text-gray-700">Contoh</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-2 font-medium">name</td>
                    <td className="px-4 py-2"><span className="text-red-500">✓</span></td>
                    <td className="px-4 py-2 text-gray-600">Text</td>
                    <td className="px-4 py-2 text-gray-500">Songkok Awing AC</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">price</td>
                    <td className="px-4 py-2"><span className="text-red-500">✓</span></td>
                    <td className="px-4 py-2 text-gray-600">Number</td>
                    <td className="px-4 py-2 text-gray-500">132500</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">description</td>
                    <td className="px-4 py-2"><span className="text-red-500">✓</span></td>
                    <td className="px-4 py-2 text-gray-600">Text</td>
                    <td className="px-4 py-2 text-gray-500">Bahan beludru premium...</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">category</td>
                    <td className="px-4 py-2"><span className="text-red-500">✓</span></td>
                    <td className="px-4 py-2 text-gray-600">Polos/Border/Laser/Susun</td>
                    <td className="px-4 py-2 text-gray-500">Polos</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">sizes</td>
                    <td className="px-4 py-2"><span className="text-red-500">✓</span></td>
                    <td className="px-4 py-2 text-gray-600">Comma-separated (3-12)</td>
                    <td className="px-4 py-2 text-gray-500">"3,4,5,6,7,8,9,10,11,12"</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">heights</td>
                    <td className="px-4 py-2"><span className="text-red-500">✓</span></td>
                    <td className="px-4 py-2 text-gray-600">Comma-separated (8-12)</td>
                    <td className="px-4 py-2 text-gray-500">"8,9,10,11,12"</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">inStock</td>
                    <td className="px-4 py-2 text-gray-400">-</td>
                    <td className="px-4 py-2 text-gray-600">true/false</td>
                    <td className="px-4 py-2 text-gray-500">true</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Upload File */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">2. Upload File CSV</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center hover:border-[#1a3f7a] transition-colors">
              <Upload size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Klik untuk upload file CSV
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Atau drag & drop file CSV Anda di sini
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 bg-[#1a3f7a] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#15335f] transition-colors"
              >
                <Upload size={20} />
                Pilih File CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step: Preview */}
      {step === 'preview' && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-800">Preview Data</h3>
                <p className="text-sm text-gray-500">File: {fileName}</p>
              </div>
              <button
                onClick={() => { setStep('upload'); setImportData([]); setFileName(''); }}
                className="text-sm text-[#1a3f7a] hover:underline"
              >
                Upload Ulang
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{importData.length}</p>
                <p className="text-sm text-blue-700">Total Baris</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{validCount}</p>
                <p className="text-sm text-green-700">Valid</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-red-600">{invalidCount}</p>
                <p className="text-sm text-red-700">Error</p>
              </div>
            </div>

            {invalidCount > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-800 font-medium mb-2">
                  ⚠️ Ada {invalidCount} baris yang tidak valid dan akan diabaikan saat import.
                </p>
                <p className="text-xs text-red-700">
                  Perbaiki file CSV Anda dan upload ulang untuk mengimport semua data.
                </p>
              </div>
            )}
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Baris</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Nama Produk</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Harga</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Kategori</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Error</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {importData.map((row, i) => (
                    <tr key={i} className={row.valid ? 'hover:bg-gray-50' : 'bg-red-50'}>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.line}</td>
                      <td className="px-4 py-3">
                        {row.valid ? (
                          <CheckCircle size={20} className="text-green-500" />
                        ) : (
                          <XCircle size={20} className="text-red-500" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 max-w-[200px] truncate">
                        {row.data.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        Rp {row.data.price.toLocaleString('id-ID')}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-[#1a3f7a]/10 text-[#1a3f7a] px-2 py-1 rounded-full">
                          {row.data.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-red-600 max-w-[200px]">
                        {row.errors.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => { setStep('upload'); setImportData([]); setFileName(''); }}
              className="flex-1 py-4 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleImport}
              disabled={validCount === 0}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#1a3f7a] text-white rounded-xl font-semibold hover:bg-[#15335f] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <CheckCircle size={20} />
              Import {validCount} Produk
            </button>
          </div>
        </div>
      )}

      {/* Step: Complete */}
      {step === 'complete' && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Import Berhasil!</h2>
          <p className="text-gray-500 mb-2">
            <span className="font-bold text-[#1a3f7a] text-2xl">{importedCount}</span> produk berhasil diimport
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Produk sekarang sudah tersedia di katalog toko Anda
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/admin/products')}
              className="px-8 py-3 bg-[#1a3f7a] text-white rounded-xl font-semibold hover:bg-[#15335f] transition-colors"
            >
              Lihat Semua Produk
            </button>
            <button
              onClick={() => { setStep('upload'); setImportData([]); setFileName(''); }}
              className="px-8 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Import Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
