import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../redux/slices/cartSlice';

const JewelryBlock = ({ id, name, price, imageUrl, sizes, types }) => {
  const cartItem = useSelector((state) => state.cartSlice.items.find((obj) => obj.id === id));
  const dispatch = useDispatch();
  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(types[0]);
  const typeName = ['самовывоз', 'доставка'];

  const onClick = () => {
    const items = {
      id,
      name,
      price,
      imageUrl,
      sizes: sizes[activeSize],
      types: typeName[activeType],
    };
    console.log(sizes, 'bla', activeSize);
    dispatch(setItems(items));
  };
  console.log(id, name, price, imageUrl, sizes, types);
  const count = cartItem ? cartItem.count : 0;

  return (
    <div className="jewelry-block-wrapper">
      <div className="jewelry-block">
        <img className="jewelry-block__image" src={imageUrl} alt="Ring" />
        <h4 className="jewelry-block__title">{name}</h4>
        <div className="jewelry-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}>
                {typeName[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((obj, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}>
                {obj} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="jewelry-block__bottom">
          <div className="jewelry-block__price">{price} ₽</div>
          <button onClick={onClick} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {count > 0 && <i>{count}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default JewelryBlock;
