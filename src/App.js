import { useEffect, useState } from 'react';
import axios from 'axios';

import Categories from './components/Categories';
import Header from './components/Header';
import JewelryBlock from './components/JewelryBlock';
import Sort from './components/Sort';

import './scss/app.scss';

function App() {
  const [item, setItem] = useState([]);

  useEffect(() => {
    axios
      .get('https://632e4bcbf9b533cc58ee4523.mockapi.io/items')
      .then((data) => setItem(data.data));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {item.map((obj) => (
              <JewelryBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
