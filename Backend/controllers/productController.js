const productService = require('../services/productService');
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

class ProductController {

  async getProducts (req, res, next) {
    try {
      const products = await productService.getProducts();
      res.json(products);
    } catch (e) {
      next(e);
    }
  }

  async getProductById (req, res, next) {
    try {
      const productId = req.params.id;
      const product = await productService.getProductById(productId);
      res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async updateProductById (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }

      const productId = req.params.id;
      const {name, description, price} = req.body;

      const product = await productService.updateProductById(productId, name, description, price);

      res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async addProduct (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }

      const {name, description, price} = req.body;

      const product = await productService.addProduct(name, description, price);

      if (!product) {
        return next(ApiError.BadRequest('Не существует такой записи'));
      }

      res.json(product);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ProductController();