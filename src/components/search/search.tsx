import debounce from 'lodash.debounce';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './search.module.scss';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(''); // локальный стейт для debounce
  const inputRef = useRef<HTMLInputElement>(null); // обращение к элементу

  const onClickClear = () => {
    //отчистка при нажатии
    dispatch(setSearchValue('')); // диспач в стейт пустой строки при отчищении
    setValue(''); // локальный стейт
    if(inputRef.current){
      inputRef.current.focus();
    } // при наведении
  };

  const updateSearchInput = useCallback(
    debounce((str:string|number) => {
      dispatch(setSearchValue(str)); // диспач введенной строки через 200мс.
    }, 200),
    [],
  ); // срабатывает перерисовка функции только после debounce

  const onChangeInput = (e:any) => {
    setValue(e.target.value); // сохраняем в локальный стейт значение
    updateSearchInput(e.target.value); //передаем строку в updateSearchInput
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        placeholder="Поиск пиццы..."
        className={styles.input}
        onChange={onChangeInput}
        value={value}
      />{' '}
      {value && (
        <svg
          className={styles.clearIcon}
          onClick={onClickClear}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};
export default Search;
