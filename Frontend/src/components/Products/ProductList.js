//список товаров
import styles from './ProductList.module.css'
import Card from '../UI/Card'
import ProductItem from './ProductItem/ProductItem';

const CATALOG_PRODUCTS = [
    {
      id: "m1",
      type: 'Обвязка',
      name: 'Привязь "Singing Rock',
      description:
        "Комфортная привязь для промальпа",
      price: 22000,
    },
    {
      id: "m2",
      type: 'Карабин',
      name: "Карабин 'VENTO",
      description: "Карабин с байнентной муфтой",
      price: 1200,
    },
    {
      id: "m3",
      type: 'Веревка',
      name: "Веревка 'Lanex",
      description: "Статика, полиамидная",
      price: 80,
    },
    {
      id: "m4",
      type: 'Зажим',
      name: 'Жумар "МАНАРАГА"',
      description:
        "Зажим для одинарной веревки",
      price: 2500,
    },
    {
        id: "m5",
        type: 'Спусковые',
        name: 'СУ "RIG Petzl"',
        description:
          "Спусковое устройство",
        price: 18500,
      },
      {
        id: "m6",
        type: 'Каска',
        name: 'Каска "Delta Plus"',
        description:
          "Каска для промальпа",
        price: 2300,
      },
  ];
  
const ProductList = (props) => {

    
    const productList = CATALOG_PRODUCTS.map((product) => (
        
        <ProductItem 
            key={product.id}
            id={product.id}
            type={product.type}
            name={product.name} 
            description={product.description}
            price={product.price}
         />
    ));
    
    return <section className={styles.products}>
        <Card>
        <ul>{productList}</ul>
        </Card>
    </section>
};

export default ProductList;