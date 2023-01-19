import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './layouts/layout';
import { Home } from './pages/Home';


import './scss/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));
const Product = React.lazy(() => import(/* webpackChunkName: "Product" */'./pages/Product'));

function App() {
  return (
    // Layout статичный элемент
    // все дочернии элементы динамичные
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={
          <Suspense fallback={<div>Загрузка...</div>}>  <Cart />  </Suspense>} />
        <Route path="product/:id" element={
          <Suspense fallback={<div>Загрузка...</div>}>  <Product />  </Suspense>} />
        <Route path="*" element={
          <Suspense fallback={<div>Загрузка...</div>}>  <NotFound />  </Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
