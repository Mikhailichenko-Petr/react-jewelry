import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import JewelryBlock from '../components/jewelryBlock';
import { Skeleton } from '../components/jewelryBlock/skeleton';
import Pagination from '../components/pagination/pegination';
import { setCategory } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';

export const Home = () => {
  const category = useSelector((state) => state.filterSlice.category);
  const dispatch = useDispatch();

  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortActive, setSortActive] = useState({ name: 'популярности', type: 'rating' });
  const { searchValue } = useContext(SearchContext); // CONTEXT

  const indexCategory = (id) => {
    dispatch(setCategory(id));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://632e4bcbf9b533cc58ee4523.mockapi.io/items/?page=${currentPage}&limit=8&sortBy=${
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
  }, [category, sortActive, currentPage]);

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
      <Pagination onChangePage={(index) => setCurrentPage(index)} />
    </div>
  );
};
