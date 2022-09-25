import { useState } from 'react';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const category = ['Все', 'Кольца', 'Серьги', 'Браслеты', 'Подвески', 'Цепи'];

  return (
    <div className="categories">
      <ul>
        {category.map((el, index) => {
          return (
            <li
              key={index}
              onClick={() => setActiveCategory(index)}
              className={activeCategory === index ? 'active' : ''}>
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Categories;
