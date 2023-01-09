import React from "react";
type categoriesType={
  value:number;
  indexCategory:(index:number) => void;
}
const Categories:React.FC<categoriesType> = ({ value, indexCategory }) => {
  const category = ['Все', 'Кольца', 'Серьги', 'Браслеты', 'Подвески', 'Цепи'];

  return (
    <div className="categories">
      <ul>
        {category.map((el, index) => {
          return (
            <li
              key={index}
              onClick={() => indexCategory(index)}
              className={value === index ? 'active' : ''}>
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Categories;
