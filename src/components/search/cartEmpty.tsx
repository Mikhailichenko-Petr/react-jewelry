import { Link } from 'react-router-dom';
import Cart from '../../assets/img/4363722.png'

export const CartEmpty = () => {
  return <div className="cart__empty">
    <img src={Cart} alt="" />
    <h1>В корзине пока ничего нет</h1>
    <Link to='/'>
      <button className="button button--outline button--add">
        <span>Перейти в каталог</span>
      </button>
    </Link>
  </div>;
};

