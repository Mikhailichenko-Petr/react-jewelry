import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import JewelryBlock from '../components/jewelryBlock';
import { Skeleton } from '../components/jewelryBlock/skeleton';
import Pagination from '../components/pagination/pegination';
import { setCategory, setPage } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';

export const Home = () => {
  const { category, page } = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();

  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortActive, setSortActive] = useState({ name: 'популярности', type: 'rating' });
  const { searchValue } = useContext(SearchContext); // CONTEXT

  const indexCategory = (id) => {
    dispatch(setCategory(id));
  };

  const setChangePage = (num) => {
    dispatch(setPage(num));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://632e4bcbf9b533cc58ee4523.mockapi.io/items/?page=${page}&limit=8&sortBy=${
          sortActive.type
        }&order='asc'${searchValue ? `?&search=${searchValue}` : ''}&${
          category > 0 ? `category=${category}` : ''
        }`,
      )
      .then((data) => {
        setItem(data.data);
        setLoading(false);
      });
    window.scrollTo(0, 0); //скролит наверх при рендеренге
  }, [category, sortActive, page]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={category} indexCategory={indexCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все украшения</h2>
      <div className="content__items">
        {loading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : item
              .filter((obj) => {
                if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
                  return true;
                }
                return false;
              })
              .map((obj) => <JewelryBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination cuurentPage={page} onChangePage={(index) => setChangePage(index)} />
    </div>
  );
};
