import { useEffect, useState } from 'react';
import axios from 'axios';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import JewelryBlock from '../components/jewelryBlock';
import { Skeleton } from '../components/jewelryBlock/skeleton';

export const Home = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryActive, setCategoryActive] = useState(0);
  const [sortActive, setSortActive] = useState({ name: 'популярности', type: 'rating' });

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://632e4bcbf9b533cc58ee4523.mockapi.io/items/?sortBy=${sortActive.type}&order=asc&${
          categoryActive > 0 ? `category=${categoryActive}` : ''
        }`,
      )
      .then((data) => {
        setItem(data.data);
        setLoading(false);
      });
    window.scrollTo(0, 0); //скролит наверх при рендеренге
  }, [categoryActive, sortActive]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryActive} indexCategory={(index) => setCategoryActive(index)} />
        <Sort value={sortActive} indexSort={(type) => setSortActive(type)} />
      </div>
      <h2 className="content__title">Все украшения</h2>
      <div className="content__items">
        {loading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : item.map((obj) => <JewelryBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
