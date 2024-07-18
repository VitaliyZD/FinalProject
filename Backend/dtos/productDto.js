//DTO (data transfer object)

class ProductDto {
  id;
  name;
  description;
  price;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.price = model.price;
    this.description = model.description;
  }
}

module.exports = ProductDto;