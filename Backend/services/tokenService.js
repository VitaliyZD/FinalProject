const jwt = require('jsonwebtoken');
const connectionDB = require('../connections/db');

class TokenService {
  // id
  // refreshToken
  // userId
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
    return {
      accessToken, refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const row = await new Promise((resolve, reject) => {
      connectionDB.get('SELECT * FROM tokens WHERE userId = ?', [userId], (err, row) => {
        if (err) {
          reject(err);
        }
        if (!row) {
          resolve(null);
        }
        resolve(row)
      });
    });

    if (row) {
      return await new Promise(((resolve, reject) => {
        connectionDB.run('UPDATE tokens SET refreshToken = ? WHERE id = ?', [refreshToken, row.id], function(err) {
          if (err) {
            reject(err);
          }
          resolve(this.changes);
          // console.log(`Row(s) updated: ${this.changes}`);
        });
      }));
    }
    const tokenId = await new Promise((resolve, reject) => {
      connectionDB.run(`INSERT INTO tokens (userId, refreshToken) VALUES (?, ?)`, [userId, refreshToken],function(err){
        if(err){
          reject(false);
        }else{
          resolve(this.lastID);
        }
      });
    })

    return await this.getTokenById(tokenId);
  }

  async getTokenById(tokenId) {
    return new Promise((resolve, reject) => {
      connectionDB.get('SELECT * FROM tokens WHERE id = ?', [tokenId], (err, row) => {
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

  async findToken(refreshToken) {
    return new Promise((resolve, reject) => {
      connectionDB.get('SELECT * FROM tokens WHERE refreshToken = ?', [refreshToken], (err, row) => {
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

  async removeToken(refreshToken) {
    const row = await this.findToken(refreshToken);
    await connectionDB.run(`DELETE FROM tokens WHERE refreshToken = ?`, [refreshToken]);
    return row;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();