/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { SettingsProvider } from './SettingsContext';
import { CartProvider } from './CartContext';
import { ProductProvider } from './ProductContext';
import { AuthProvider, useAuth } from './AuthContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <ProductProvider>
          <CartProvider>
            <AuthProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="success" element={<Success />} />
                    <Route path="login" element={<Login />} />
                    <Route path="admin" element={
                      <RequireAuth>
                        <Admin />
                      </RequireAuth>
                    } />
                  </Route>
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </CartProvider>
        </ProductProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}
