import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'skintrade_cart_v1';

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.warn('CartProvider: no se pudo parsear localStorage', err);
      return [];
    }
  });

  const addToCart = (product) => setCart(prev => [...prev, product]);
  const removeFromCart = (index) => setCart(prev => prev.filter((_, i) => i !== index));
  const emptyCart = () => setCart([]);

  const total = useMemo(() => cart.reduce((s, p) => s + (p.precioProducto || p.price || 0), 0), [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn('CartProvider: no se pudo guardar en localStorage', err);
    }
  }, [cart]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        const newCart = e.newValue ? JSON.parse(e.newValue) : [];
        setCart(newCart);
      } catch (err) {
        console.warn('CartProvider: fallo al sincronizar desde storage event', err);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value = { cart, addToCart, removeFromCart, emptyCart, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
