import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QueryString from 'qs';
import { useRef } from 'react';

import Sort, { sortType } from '../components/Sort';
import Categories from '../components/Categories';
import JewelryBlock from '../components/jewelryBlock';
import { Skeleton } from '../components/jewelryBlock/skeleton';
import Pagination from '../components/pagination/pegination';
import { selectFilter, setCategory, setFilters, setPage } from '../redux/slices/filterSlice';
import { fetchJewelry, selectSlice } from '../redux/slices/jewelrySlice';



export const Home:React.FC = () => {
  const navigate = useNavigate(); // создает URL
  const { category, searchValue, page, sort } = useSelector(selectFilter);
  const { items, status } = useSelector(selectSlice);
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isUrl = useRef(false);

  const indexCategory = (id:number) => {
    dispatch(setCategory(id));
  };

  const setChangePage = (num:number) => {
    dispatch(setPage(num));
  };

  const getJewelry = async () => {  
    dispatch(
      fetchJewelry({
        category,
        page,
        sort,
        searchValue,
      }),
    );
    window.scrollTo(0, 0);
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
    getJewelry();
  }, [category, sort, searchValue, page]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={category} indexCategory={indexCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все украшения</h2>
      <div className="content__items">
        {status === 'error' ? (
          //если статус запроса ошибка, то
          <div className="content__info-error">ERROR 404</div>
        ) : //если статус кода загрузка, то
        status === 'loading' ? (
          [...new Array(10)].map((_, index) => <Skeleton key={index} />)
        ) : (
          items
            .filter((obj:any) => {
              if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
              }
              return false;
            })
            .map((obj:any) => <JewelryBlock key={obj.id} {...obj} />)
        )}
      </div>
      <Pagination cuurentPage={page} onChangePage={(index:number) => setChangePage(index)} />
    </div>
  );
};
