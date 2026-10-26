import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products as initialProducts } from '../data/products';

interface Order {
  id: string;
  items: { product: Product; quantity: number; size: number; height: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  customer: { name: string; email: string; phone: string; address: string };
  shipping: string;
  payment: string;
  date: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  icon: string;
}

interface AdminContextType {
  isAdmin: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status']) => void;
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'productCount'>) => void;
  updateCategory: (id: number, category: Partial<Omit<Category, 'id' | 'productCount'>>) => void;
  deleteCategory: (id: number) => void;
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'admin123';

const defaultCategories: Category[] = [
  { id: 1, name: 'Polos', slug: 'polos', description: 'Songkok polos tanpa hiasan, simpel dan elegan', productCount: 2, icon: '⚫' },
  { id: 2, name: 'Border', slug: 'border', description: 'Songkok dengan bordir premium yang elegan', productCount: 2, icon: '✨' },
  { id: 3, name: 'Laser', slug: 'laser', description: 'Songkok dengan teknologi laser cutting presisi tinggi', productCount: 2, icon: '🔷' },
  { id: 4, name: 'Susun', slug: 'susun', description: 'Songkok dengan desain susun klasik yang timeless', productCount: 2, icon: '🎭' },
];

function loadProducts(): Product[] {
  const saved = localStorage.getItem('awning_products');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialProducts;
    }
  }
  return initialProducts;
}

function loadCategories(): Category[] {
  const saved = localStorage.getItem('awning_categories');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultCategories;
    }
  }
  return defaultCategories;
}

function loadOrders(): Order[] {
  const saved = localStorage.getItem('awning_orders');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  // Demo orders
  return [
    {
      id: 'ORD-001234',
      items: [{ product: initialProducts[0], quantity: 2, size: 7, height: 10 }],
      total: 265000,
      status: 'pending',
      customer: { name: 'Ahmad Surya', email: 'ahmad@email.com', phone: '081234567890', address: 'Jl. Merdeka No. 10, Jakarta' },
      shipping: 'jne',
      payment: 'transfer',
      date: '2024-12-15',
    },
    {
      id: 'ORD-001235',
      items: [{ product: initialProducts[1], quantity: 1, size: 8, height: 11 }],
      total: 155000,
      status: 'processing',
      customer: { name: 'Budi Santoso', email: 'budi@email.com', phone: '082345678901', address: 'Jl. Sudirman No. 45, Bandung' },
      shipping: 'jt',
      payment: 'ewallet',
      date: '2024-12-14',
    },
    {
      id: 'ORD-001236',
      items: [{ product: initialProducts[2], quantity: 3, size: 6, height: 9 }],
      total: 495000,
      status: 'shipped',
      customer: { name: 'Hasan Malik', email: 'hasan@email.com', phone: '083456789012', address: 'Jl. Diponegoro No. 22, Surabaya' },
      shipping: 'instant',
      payment: 'cod',
      date: '2024-12-13',
    },
    {
      id: 'ORD-001237',
      items: [{ product: initialProducts[3], quantity: 1, size: 9, height: 12 }],
      total: 145000,
      status: 'completed',
      customer: { name: 'Rizki Pratama', email: 'rizki@email.com', phone: '084567890123', address: 'Jl. Gatot Subroto No. 8, Yogyakarta' },
      shipping: 'jne',
      payment: 'transfer',
      date: '2024-12-10',
    },
  ];
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('awning_admin') === 'true';
  });
  const [products, setProducts] = useState<Product[]>(loadProducts);
  const [orders, setOrders] = useState<Order[]>(loadOrders);
  const [categories, setCategories] = useState<Category[]>(loadCategories);

  useEffect(() => {
    localStorage.setItem('awning_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('awning_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('awning_categories', JSON.stringify(categories));
  }, [categories]);

  const adminLogin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('awning_admin', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('awning_admin');
  };

  const addProduct = (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct: Product = {
      ...product,
      id: newId,
      rating: 0,
      reviews: 0,
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addCategory = (category: Omit<Category, 'id' | 'productCount'>) => {
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    const newCategory: Category = {
      ...category,
      id: newId,
      productCount: 0,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: number, updates: Partial<Omit<Category, 'id' | 'productCount'>>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCategory = (id: number) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0),
    pendingOrders: orders.filter(o => o.status === 'pending').length,
  };

  return (
    <AdminContext.Provider value={{
      isAdmin, adminLogin, adminLogout,
      products, addProduct, updateProduct, deleteProduct,
      orders, updateOrderStatus,
      categories, addCategory, updateCategory, deleteCategory,
      stats,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
}
