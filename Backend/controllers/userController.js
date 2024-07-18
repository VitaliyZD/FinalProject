const userService = require('../services/userService');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
  async registration (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }

      console.log('body', req.body)
      const {username, password} = req.body;
      const userData = await userService.registration(username, password);

      // Храним refresh токен в куках, и делаем httpOnly чтобы ее нельзя было перезаписать js-том
      const timeCookie = 30 * 24 * 60 * 60 * 1000;
      res.cookie('refreshToken', userData.refreshToken, {maxAge: timeCookie, httpOnly: true})

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login (req, res, next) {
    try {
      const {username, password} = req.body;
      const userData = await userService.login(username, password);
      // Храним refresh токен в куках, и делаем httpOnly чтобы ее нельзя было перезаписать js-том
      const timeCookie = 30 * 24 * 60 * 60 * 1000;
      res.cookie('refreshToken', userData.refreshToken, {maxAge: timeCookie, httpOnly: true});
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;

      const userData = await userService.refresh(refreshToken);
      // Храним refresh токен в куках, и делаем httpOnly чтобы ее нельзя было перезаписать js-том
      const timeCookie = 30 * 24 * 60 * 60 * 1000;
      res.cookie('refreshToken', userData.refreshToken, {maxAge: timeCookie, httpOnly: true});
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout (req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();