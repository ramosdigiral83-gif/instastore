/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { SettingsProvider } from './SettingsContext';
import { CartProvider } from './CartContext';
import { ProductProvider } from './ProductContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <ProductProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="success" element={<Success />} />
                  <Route path="admin" element={<Admin />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}
