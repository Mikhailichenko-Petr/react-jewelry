import { Routes, Route } from 'react-router-dom';

import Layout from './layouts/layout';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Product } from './pages/Product';

import './scss/app.scss';

function App() {
  return (
    // Layout статичный элемент
    // все дочернии элементы динамичные
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
