import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Sort, { sortType } from '../components/Sort';
import Categories from '../components/Categories';
import JewelryBlock from '../components/jewelryBlock';
import { Skeleton } from '../components/jewelryBlock/skeleton';
import Pagination from '../components/pagination/pegination';
import { setCategory, setFilters, setPage } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import QueryString from 'qs';
import { useRef } from 'react';

export const Home = () => {
  const navigate = useNavigate(); // создает URL
  const { category, page, sort } = useSelector((state) => state.filterSlice);
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isUrl = useRef(false);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchValue } = useContext(SearchContext); // CONTEXT

  const indexCategory = (id) => {
    dispatch(setCategory(id));
  };

  const setChangePage = (num) => {
    dispatch(setPage(num));
  };

  const fetchPizzas = () => {
    setLoading(true);
    axios
      .get(
        `https://632e4bcbf9b533cc58ee4523.mockapi.io/items/?page=${page}&limit=8&sortBy=${
          sort.type
        }&order='asc'${searchValue ? `?&search=${searchValue}` : ''}&${
          category > 0 ? `category=${category}` : ''
        }`,
      )
      .then((data) => {
        setItem(data.data);
        setLoading(false);
      });
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isUrl.current) {
      const quertyString = QueryString.stringify({
        sortProperty: sort.type,
        category,
        page,
      }); // создаем URL
      navigate(`?${quertyString}`);
    }
    isUrl.current = true;
  }, [category, sort.type, page]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в STATE
  useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      const sort = sortType.find((obj) => obj.type === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    } // передает в STATE URL
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0); //скролит наверх при рендеренге
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [category, sort.type, searchValue, page]);

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
