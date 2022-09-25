import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        К сожалению, подходящих товаров не найдено, но вы можете вернуться в{' '}
        <Link to="/">каталог</Link>
      </h1>
    </div>
  );
};
export default NotFoundBlock;
