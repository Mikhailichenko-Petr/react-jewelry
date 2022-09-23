import Categories from './components/Categories';
import Header from './components/Header';
import JewelryBlock from './components/JewelryBlock';
import Sort from './components/Sort';
import jewelry from './assets/jewelry.json';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {jewelry.map((obj) => (
              <JewelryBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
