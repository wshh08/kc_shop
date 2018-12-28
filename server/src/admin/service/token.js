const jwt = require('jsonwebtoken');
const secret = 'SLDLKKDS323ssdd@#@@gf';

module.exports = class extends think.Service {
  /**
   * 根据header中的X-Xbyjshop-Token值获取用户id
   */
  async getUserId() {
    const token = think.token;
    //token为空，返回0
    if (!token) {
      return 0;
    }

    //验证token的合法性，如果合法，返回token里面payload的值，不合法0
    const result = await this.parse();
    if (think.isEmpty(result) || result.user_id <= 0) {
      return 0;
    }
    
    //user_id是在/admin/controller/auth.js/login函数下创建token时添加的字段
    return result.user_id;
  }

  /**
   * 根据值获取用户信息
   */
  async getUserInfo() {
    const userId = await this.getUserId();
    if (userId <= 0) {
      return null;
    }

    //select * from xbyjshop_admin where id = 1;
    const userInfo = await this.model('admin').where({ id: userId }).find();
  
    return think.isEmpty(userInfo) ? null : userInfo;
  }
  
  async create(userInfo) {
    //jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign(userInfo, secret);
    return token;
  }

  //验证token的合法性，如果合法，返回token里面payload的值，不合法返回空
  async parse() {
    if (think.token) {
      try {
        //验证token的合法性
        return jwt.verify(think.token, secret);
      } catch (err) {
        return null;
      }
    }
    return null;
  }
};
