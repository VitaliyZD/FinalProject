import styles from "./Filter.module.css";

const Filter = (props) => {
  const сategoryСhangeHandler = (event) => {
    props.onChangeCategory(event.target.value);
  };

  return (
    <div className={styles.filter}>
      <div className={styles["ilter__control"]}>
        <select value={props.сategory} onChange={сategoryСhangeHandler}>
          <option value="Карабины">Карабины</option>
          <option value="Веревки">Веревки</option>
          <option value="Зажимы">Зажимы</option>
          <option value="Спусковые">Спусковые</option>
          <option value="Обвязки">Обвязки</option>
          <option value="Каски">Каски</option>
          <option value="Усы и петли">Усы и петли</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;