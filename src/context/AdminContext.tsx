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
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'admin123';

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

  useEffect(() => {
    localStorage.setItem('awning_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('awning_orders', JSON.stringify(orders));
  }, [orders]);

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
      orders, updateOrderStatus, stats,
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
