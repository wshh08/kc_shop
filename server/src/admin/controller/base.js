module.exports = class extends think.Controller {
  async __before() {
    //根据token值获取用户id
    //根据请求头获取x-nideshop-token的值，不存在则为空
    //在admin/service/token.js中有用到
    think.token = this.ctx.header['x-nideshop-token'] || '';

    //加载admin模块下面的token服务
    const tokenSerivce = think.service('token', 'admin');
    //获取user_id，合法则为数据库中的某个值，不合法则为0
    think.userId = await tokenSerivce.getUserId();

    // 只允许登录操作
    if (this.ctx.controller !== 'auth') {
      if (think.userId <= 0) {
        return this.fail(401, '请先登录');
      }
    }
  }
};
