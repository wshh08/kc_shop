module.exports = class extends think.Logic {
  //在登录时自动校验
  loginAction() {
    this.allowMethods = 'post';
    this.rules = {
      username: { required: true, string: true },
      password: { required: true, string: true }
    };
    //相当于
    // let rules = {
    //   username: {
    //     required: true，
    //     string: true
    //   },
    //   password: {
    //      required: true，
    //      string: true
    //   }
    //};
    // let flag = this.validate(rules);
    // if(!flag){
    //   return this.fail(this.config('validateDefaultErrno') , this.validateErrors);
    // }
    //在验证失败的情况下 this.validateErrors 将为 {username: 'username can not be blank'}
  }
};
