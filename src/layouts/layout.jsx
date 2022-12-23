////// ДЛЯ СТАТИЧНОЙ СТРАНИЦЕ   ---HEADER---
////// ДЛЯ ДИНАМИЧНЫХ СТРАНИЦ   ---Outlet---    App.js  Line15-18 строку
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
