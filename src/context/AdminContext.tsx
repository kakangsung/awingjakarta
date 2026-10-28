import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products as initialProducts } from '../data/products';
import {
  db,
  subscribeToProducts,
  addProductToFirestore,
  updateProductInFirestore,
  deleteProductFromFirestore,
  subscribeToCategories,
  addCategoryToFirestore,
  updateCategoryInFirestore,
  deleteCategoryFromFirestore,
  subscribeToOrders,
  updateOrderInFirestore,
} from '../firebase/config';

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
  id: string;
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
  updateCategory: (id: string, category: Partial<Omit<Category, 'id' | 'productCount'>>) => void;
  deleteCategory: (id: string) => void;
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
  };
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'admin123';

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('awning_admin') === 'true';
  });
  
  // Firebase data states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to Firebase collections
  useEffect(() => {
    const unsubscribeProducts = subscribeToProducts((productsData) => {
      setProducts(productsData as Product[]);
      setLoading(false);
    });

    const unsubscribeOrders = subscribeToOrders((ordersData) => {
      setOrders(ordersData as Order[]);
    });

    const unsubscribeCategories = subscribeToCategories((categoriesData) => {
      setCategories(categoriesData as Category[]);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeOrders();
      unsubscribeCategories();
    };
  }, []);

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

  const addProduct = async (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    try {
      await addProductToFirestore({
        ...product,
        rating: 0,
        reviews: 0,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (id: number, updates: Partial<Product>) => {
    try {
      await updateProductInFirestore(String(id), updates);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await deleteProductFromFirestore(String(id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      await updateOrderInFirestore(id, { status });
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const addCategory = async (category: Omit<Category, 'id' | 'productCount'>) => {
    try {
      await addCategoryToFirestore({
        ...category,
        productCount: 0,
      });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const updateCategory = async (id: string, updates: Partial<Omit<Category, 'id' | 'productCount'>>) => {
    try {
      await updateCategoryInFirestore(id, updates);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteCategoryFromFirestore(id);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + (o.total || 0), 0),
    pendingOrders: orders.filter(o => o.status === 'pending').length,
  };

  return (
    <AdminContext.Provider value={{
      isAdmin, adminLogin, adminLogout,
      products, addProduct, updateProduct, deleteProduct,
      orders, updateOrderStatus,
      categories, addCategory, updateCategory, deleteCategory,
      stats,
      loading,
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
