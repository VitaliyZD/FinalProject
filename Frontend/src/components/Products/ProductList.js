//список товаров
import styles from './ProductList.module.css'
import Card from '../UI/Card'
import ProductItem from './ProductItem/ProductItem';


const CATALOG_PRODUCTS = [
    {
      id: "m1",
      type: 'Обвязки',
      name: 'Привязь Singing Rock "EXPERT III speed"',
      description:"Комфортная привязь для промальпа. Увеличенный кушак и ремни, что обеспечивает комфортную работу. Передняя часть отстегивается карабином",
      price: 28000,
      img: 'https://avatars.mds.yandex.net/i?id=d5540cd661b8e0ce1ba3766b1cbe8e94_l-5233591-images-thumbs&n=13',
    },
    {
      id: "m2",
      type: 'Карабины',
      name: "Карабин VENTO овал",
      description: "Карабин овальный с байнентной муфтой. Небольшой размер позволяет максимально удобно осуществлять перестежку. Овальная форма идеально подходит для полиспастов и спусковых устройств",
      price: 1200,
      img: 'https://www.kant.ru/upload/iblock/89a/89abc1b1eb1e494901b4bcfd5d6e9067.jpg',
    },
    {
      id: "m3",
      type: 'Веревка',
      name: "Веревка Lanex",
      description: "Свойство - статика, состав - полиамид. Особенность веревки - сохранение прочности, мягкости на протяжении многих лет",
      price: 80,
      img: 'https://i.ebayimg.com/images/g/JUsAAOSwHhRbyZEW/s-l1600.jpg'
    },
    {
      id: "m4",
      type: 'Зажимы',
      name: 'Жумар МАНАРАГА',
      description:"Зажим для одинарной веревки. Имеет удобную ручку для руки. Используется для подъемов и в качестве стопора иных элементов",
      price: 2500,
      img: 'https://avatars.mds.yandex.net/i?id=174c81ffa2aa91c5fded586ac61579db234a68d0-5221012-images-thumbs&n=13',
    },
    {
        id: "m5",
        type: 'Спусковые',
        name: 'Спусковое устройство "RIG Petzl"',
        description:"Спусковое устройство используется для спуска альпиниста. Может использоваться в качестве страховочного устройства или полиспастов",
        price: 18500,
        img: 'https://otmir.ru/upload/iblock/af4/vcuns2rml9c39y5p18zp59j9ernhoml9.jpg',
      },
      {
        id: "m6",
        type: 'Каски',
        name: 'Каска Delta Plus',
        description:"Каска для промальпа. Имеет дополнительное ребро жесткости в отличии от спортивных касок",
        price: 2300,
        img: 'https://www.deloks.ru/upload/iblock/e88/793gstj1ae73bt700wx8ik208x7ee3nt/kaska_delta_plus_granite_wind_sinyaya_1_full.jpg',
      },
      {
        id: "m7",
        type: 'Обвязки',
        name: 'Привязь Singing Rock ProfiWalker',
        description:"Комфортная привязь для промальпа. Комфортная привязь для промальпа. Увеличенный кушак и ремни, что обеспечивает комфортную работу",
        price: 22000,
        img: 'https://yandex-images.clstorage.net/S5KE3f184/67382fA1e/E9hTrJfV_9ZV43MR5u4feO_BVHqnG5OHa5QNfGuyh5KouFanDlkLqjakSY3KF5cpqQhPMAC1YfK3wi94DfgFM0LZCrnC1IbKVfciPc_ed0ivlGQPq06b43uJaU0yEmMfeWX_Qqegwl_O1RTgv0KuGKQJ_oRB4eFbN3qjTPUp4OaHEA_Eu5lSvilTWjHKXq_Ut0hUClPOk6on0PhYpjqvwxlN57arOFZb2o3wwJMyG5AMGdpBEWk526-ul-hR5fxqN7w_NJd1AgapY44tzqJvsMMQIEoPxjeSV2TMjGq-t9ed8U9GexA2t6qhTNx_gos0RMlS4YFF5dfX0tPcrZ2cQj8QE_TTuVqOfT8CJQYKY8hX9DAqE-Y_GseIJEg2DsvTzWlLIq-AVudCUQS8i44P4MRJBmXxmaGX63aLbEVRdEpzPG8sRwG6hqXnrglGSnc4P5QodpsWY0LDoFQYOs4TK7FxC9aLNPZ_fn0kxJey78QsycLd7eXVW3eep6BFEfzeM1iLTLMNjuohV_ZhKgJjbH-khBI_loc-0-jI3NJOV7tZfcc-ByBC23ptvDC_vhO4iAWaPeV1TXOjeu9o6d1QvtsY-2DXoVpOuVvaHTpam9RfBPxOq-ozji_YIJwiQnvLQWHPyquoNq-iPXhMq16v6MQZ1q0l8UW73w4rlO0N-IKLuNPMhw2C_sWTHiEmKivka-B4Fv9qO7rTYMCA0srfB6kNvxYL2IIjIolYgKMylzigzS5lxb0R01uaj5z1FXw2D9BbVI8J5op9d27ljq43MKu4QEY7akcmL3wYQLL2m891QYvqe2wOO74trMw3-vso_H2mkX2tucfvfnvAOXGIwgvkz-wjvVYq_W-GQb6m_7RzRMSCP6qzniugJIBWaocrmWELGuc0_m_ijbDoFwbDuHBBMs3JVeF_24bz_BnBLIJbJON0j1HyDlHrrpGqojPgLwDwxvfutxID7MCgtuZI',
      },
      {
        id: "m8",
        type: 'Карабины',
        name: "Карабин МАНАРАГА",
        description: "Карабин с байнентной муфтой имеет увеличенный размер, что позволяет увеличить количество пристегиваемых елементов",
        price: 1300,
        img: 'https://avatars.mds.yandex.net/get-mpic/12300570/2a0000018eefc69a3c2831e6e5b3effdda24/orig',
      },
      {
        id: "m9",
        type: 'Веревка',
        name: "Веревка Fortis",
        description: "Свойство - статика, состав - полиэфир. Особенность веревки - сохранение прочности, мягкости на протяжении многих лет",
        price: 75,
        img: 'https://sizcontract.ru/upload/iblock/d1a/eu0bi5zw4zsz5h3fgbkc6u0cysgf5co8/veryevka_staticheskaya_fortis_11_mm_azotkhimfortis_100_m.jpg',
      },
      {
        id: "m10",
        type: 'Зажимы',
        name: 'Жумар VENTO',
        description: "Зажим для одинарной веревки. Имеет увеличенный разъем снизу, улучшенную ручку по сравнению с предыдущей версией",
        price: 3500,
        img: 'https://avatars.mds.yandex.net/i?id=ca01f487f79ff05cdae588031873ebe8_l-5348290-images-thumbs&n=13',
      },
      {
          id: "m11",
          type: 'Усы и петли',
          name: 'Станционная петля VENTO',
          description: "Станционная петля предназначена для организации точки опоры для наведения перил, страховки и пр.",
          price: 800,
          img: 'https://avatars.mds.yandex.net/i?id=a498605b089b54c9ffef7c9a5f078d84_l-5029416-images-thumbs&n=13',
        },
        {
          id: "m12",
          type: 'Усы и петли',
          name: 'Ус самостраховки VENTO',
          description: "Подходит в качестве короткого уса для самостраховки человека. Благодаря встроенной резинки, ус временно укорачивается в длине",
          price: 1200,
          img: 'https://www.kant.ru/upload/iblock/c07/c0774035db6e51e60e269e2ea58d7e1b.jpg',
        },
        {
          id: "m13",
          type: 'Карабины',
          name: "Карабин VENTO Helium",
          description: "Карабин с закручивающейся муфтой не позволяет привести в произвольное открытие карабина",
          price: 1200,
          img: 'https://avatars.mds.yandex.net/i?id=c2330fb2257864b5d92cdc290dce5be67a7887fa-7149282-images-thumbs&n=13',
        },
  ];
  
const ProductList = (props) => {

  const filteredProducts = CATALOG_PRODUCTS.filter(product => {
    return product.type === props.selectedCategory;
  })
    
    const productList = filteredProducts.map((product) => (
        
        <ProductItem 
            key={product.id}
            id={product.id}
            type={product.type}
            name={product.name} 
            description={product.description}
            price={product.price}
            img={product.img}
         />
    ));

    return <section className={styles.products}>
        <Card>
        <ul>{productList}</ul>
        </Card>

    </section>
};

export default ProductList;