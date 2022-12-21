import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export const Product = () => {
  const [product, setProduct] = useState();
  const { id } = useParams(); // позволяет вытащить ID с "/product/:id"
  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios.get(`https://632e4bcbf9b533cc58ee4523.mockapi.io/items/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(product, 'ошибка', error);
      }
    }
    fetch();
  }, []);

  if (!product) {
    return 'Загрузка...';
  }

  return (
    <div className="container container--cart">
      <img src={product.imageUrl} alt="" />
      <h4 className="jewelry-block__title">{product.name}</h4>
      <div className="jewelry-block__price">{product.price} ₽</div>
      <div className="cart">
        <div className="cart__bottom">
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Добавить в корзину</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
