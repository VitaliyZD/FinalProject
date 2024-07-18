const connectionDB = require('../connections/db');
const productDto = require("../dtos/productDto");

class ProductService {
  async getProducts() {
    return new Promise((resolve, reject) => {
      connectionDB.all('SELECT * FROM products', (err, rows) => {
        if (err) {
          reject(err);
        }
        if (!rows) {
          reject([]);
        }
        resolve(rows)
      });
    });
  }

  async getProductById(productId) {
    return new Promise((resolve, reject) => {
      connectionDB.get('SELECT * FROM products WHERE id = ?', [productId], (err, row) => {
        if (err) {
          reject(err);
        }
        if (!row) {
          resolve(null);
        }
        resolve(row)
      });
    });
  }

  async addProduct(name, description, price) {
    const productId = await new Promise((resolve, reject) => {
      connectionDB.run(`INSERT INTO products (name, description, price) VALUES (?, ?, ?)`, [name, description, price],function(err){
        if(err){
          reject(false);
        }else{
          resolve(this.lastID);
        }
      });
    })
    const row = await this.getProductById(productId);

    const productDtoData = new productDto({...row});

    return {...productDtoData};
  }

  async updateProductById(productId, name, description, price) {
    await db.run('UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, productId]);
    const row = await this.getProductById(productId);

    const productDtoData = new productDto({...row});

    return {...productDtoData};
  }
}

module.exports = new ProductService();