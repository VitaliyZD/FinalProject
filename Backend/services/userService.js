const connectionDB = require('../connections/db');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const tokenService = require('./tokenService');
const userDto = require('../dtos/userDto');
const ApiError = require('../exceptions/api-error');
const userService = require('../services/userService');

class UserService {
  async getUserById(userId) {
    return new Promise((resolve, reject) => {
      connectionDB.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
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
  async getUserByName(username) {
    return new Promise((resolve, reject) => {
      connectionDB.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
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

  async registration(username, password) {
    const candidate = await this.getUserByName(username);
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с именем ${username} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const userId = await new Promise((resolve, reject) => {
      connectionDB.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashPassword],function(err){
        if(err){
          reject(false);
        }else{
          resolve(this.lastID);
        }
      });
    })
    const user = await this.getUserById(userId);

    const userDtoData = new userDto(user);

    const tokens = tokenService.generateToken({...userDtoData});
    await tokenService.saveToken(userDtoData.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDtoData
    }
  }

  async login(username, password) {
    const user = await this.getUserByName(username)
    if (!user) {
      throw ApiError.BadRequest(`Неверное имя или пароль`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный email или пароль`);
    }

    const userDtoData = new userDto(user);
    const tokens = tokenService.generateToken({...userDtoData});
    await tokenService.saveToken(userDtoData.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDtoData
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = tokenService.findToken(refreshToken);
    if(!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }
    const user = await this.getUserById(userData.id);
    const userDtoData = new userDto(user);
    const tokens = tokenService.generateToken({...userDtoData});
    await tokenService.saveToken(userDtoData.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDtoData
    }
  }
}

module.exports = new UserService();