const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);

module.exports = router