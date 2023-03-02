import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';


import { Sort, Categories, JewelryBlock, Skeleton, Pagination, } from '../components/imports';
import { DispatchUp } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectSlice } from '../redux/jewelry/selectors';
import { setCategory, setPage } from '../redux/filter/filterSlice';
import { fetchJewelry } from '../redux/jewelry/asyncAction';



export const Home: React.FC = () => {
  // const navigate = useNavigate(); // создает URL
  const { category, searchValue, page, sort } = useSelector(selectFilter);
  const { items, status } = useSelector(selectSlice);
  const dispatch = DispatchUp();
  // const isSearch = useRef(false);
  // const isUrl = useRef(false);


  const indexCategory = useCallback((id: number) => {
    dispatch(setCategory(id));
  }, [])

  const setChangePage = useCallback((num: number) => {
    dispatch(setPage(num));
  }, [])

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
  // useEffect(() => {
  //   if (isUrl.current) {
  //     const quertyString = QueryString.stringify({
  //       sortProperty: sort.type,
  //       category,
  //       page,
  //     }); // создаем URL
  //     navigate(`?${quertyString}`);
  //   }
  //   isUrl.current = true;
  // }, [category, sort.type, page]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в STATE
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = QueryString.parse(window.location.search.substring(1))as unknown as FethDataType;
  //     const sort = sortType.find((obj) => obj.type === params.sort.type);
  //     if(sort){
  //       params.sort = sort
  //     }
  //     dispatch(
  //       setFilters({
  //         searchValue: params.searchValue,
  // category: params.category,
  // page: params.page,
  // sort: params.sort,
  //       }),
  //        //     searchValue: params.search,
  //   //     categoryId: Number(params.category),
  //   //     currentPage: Number(params.currentPage),
  //   //     sort: sortObj || sortList[0]
  //     );
  //     isSearch.current = true;
  //   } // передает в STATE URL
  // }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    getJewelry();
  }, [category, sort, searchValue, page]);


  return (
    <div className="container">
      <div className="content__top">
        <Categories value={category} indexCategory={indexCategory} />
        <Sort sort={sort} />
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
              .filter((obj: any) => {
                if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
                  return true;
                }
                return false;
              })
              .map((obj: any) => <JewelryBlock key={obj.id} {...obj} />)
          )}
      </div>
      <Pagination cuurentPage={page} onChangePage={(index: number) => setChangePage(index)} />
    </div>
  );
};
