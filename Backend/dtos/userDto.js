//DTO (data transfer object)

class UserDto {
  username;
  id;

  constructor(model) {
    this.username = model.username;
    this.id = model.id;
  }
}

module.exports = UserDto;