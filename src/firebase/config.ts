import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBNVFYuf6ecGzVTgeMUupuJwDGmOnQOup8",
  authDomain: "kakangsung-fb4b3.firebaseapp.com",
  projectId: "kakangsung-fb4b3",
  storageBucket: "kakangsung-fb4b3.firebasestorage.app",
  messagingSenderId: "165595537442",
  appId: "1:165595537442:web:acd7bad4b168267bacaa7b",
  measurementId: "G-1EJB6X8K97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Collection References
export const productsCollection = collection(db, 'products');
export const categoriesCollection = collection(db, 'categories');
export const ordersCollection = collection(db, 'orders');

// ============ PRODUCTS ============
export const addProductToFirestore = async (product: any) => {
  const docRef = doc(productsCollection);
  await setDoc(docRef, { ...product, id: docRef.id });
  return docRef.id;
};

export const updateProductInFirestore = async (id: string, data: any) => {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, data);
};

export const deleteProductFromFirestore = async (id: string) => {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
};

export const subscribeToProducts = (callback: (products: any[]) => void) => {
  const q = query(productsCollection, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(products);
  });
};

// ============ CATEGORIES ============
export const addCategoryToFirestore = async (category: any) => {
  const docRef = doc(categoriesCollection);
  await setDoc(docRef, { ...category, id: docRef.id });
  return docRef.id;
};

export const updateCategoryInFirestore = async (id: string, data: any) => {
  const docRef = doc(db, 'categories', id);
  await updateDoc(docRef, data);
};

export const deleteCategoryFromFirestore = async (id: string) => {
  const docRef = doc(db, 'categories', id);
  await deleteDoc(docRef);
};

export const subscribeToCategories = (callback: (categories: any[]) => void) => {
  return onSnapshot(categoriesCollection, (snapshot) => {
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(categories);
  });
};

// ============ ORDERS ============
export const addOrderToFirestore = async (order: any) => {
  const docRef = doc(ordersCollection);
  await setDoc(docRef, { ...order, id: docRef.id, createdAt: new Date().toISOString() });
  return docRef.id;
};

export const updateOrderInFirestore = async (id: string, data: any) => {
  const docRef = doc(db, 'orders', id);
  await updateDoc(docRef, data);
};

export const subscribeToOrders = (callback: (orders: any[]) => void) => {
  const q = query(ordersCollection, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(orders);
  });
};
