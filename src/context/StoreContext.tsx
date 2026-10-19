import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  size: number;
  height: number;
}

interface User {
  name: string;
  email: string;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: number, height: number) => void;
  removeFromCart: (productId: number, size: number, height: number) => void;
  updateQuantity: (productId: number, size: number, height: number, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const addToCart = (product: Product, size: number, height: number) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.product.id === product.id && item.size === size && item.height === height
      );
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size && item.height === height
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, size, height }];
    });
  };

  const removeFromCart = (productId: number, size: number, height: number) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.size === size && item.height === height)
    ));
  };

  const updateQuantity = (productId: number, size: number, height: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, size, height);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && item.size === size && item.height === height
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const login = (name: string, email: string) => setUser({ name, email });
  const logout = () => setUser(null);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount,
      wishlist, toggleWishlist, isInWishlist,
      user, login, logout,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
