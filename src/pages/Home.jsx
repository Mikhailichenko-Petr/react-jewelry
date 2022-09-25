import { useEffect, useState } from 'react';
import axios from 'axios';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import JewelryBlock from '../components/jewelryBlock';
import { Skeleton } from '../components/jewelryBlock/skeleton';

export const Home = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://632e4bcbf9b533cc58ee4523.mockapi.io/items').then((data) => {
      setItem(data.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, index) => <Skeleton />)
          : item.map((obj) => <JewelryBlock key={obj.id} {...obj} />)}
      </div>
    </>
  );
};
