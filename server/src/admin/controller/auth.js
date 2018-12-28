/**
 * Created by Administrator on 2018/12/26 0026.
 */
const Base = require('./base.js');

module.exports = class extends Base {
    async loginAction() {
        const username = this.post('username');
        const password = this.post('password');

        //select * from xbyjshop_admin where username = 'admin';
        const admin = await this.model('admin').where({ username: username }).find();

        // console.log(this.model('admin'));
        // var type = typeof(password);

        if (think.isEmpty(admin)) {
            return this.fail(401, '用户名或密码不正确1');
        }

        //think.md5(str)：计算字符串md5的值，将计算结果和数据库中的password匹配
        if (think.md5(password + '' + admin.password_salt) !== admin.password) {
            return this.fail(400, '用户名或密码不正确2');
        }

        // 更新登录信息
        //update xbyjshop_admin set last_login_time = 472156363, last_login_ip = '123.14.12.15' where id = 1;
        await this.model('admin').where({ id: admin.id }).update({
            last_login_time: parseInt(Date.now() / 1000),
            last_login_ip: this.ctx.ip
        });

        const TokenSerivce = this.service('token', 'admin');
        //创建jwt，会自动增加iat（签发时间）
        //{
        //     "user_id": 1,
        //     "iat": 1545833183
        // }
        //sessionKey:
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        // eyJ1c2VyX2lkIjoxLCJpYXQiOjE1NDU4NzgyOTl9.
        // 0Grh05KhhV7FXVSpDr593eP0ZsklF0cZn9pgPP1QCp0
        //header.payload.signature
        const sessionKey = await TokenSerivce.create({
            user_id: admin.id
        });

        if (think.isEmpty(sessionKey)) {
            return this.fail('登录失败');
        }

        // userInfo = {
        //     "id": 1,
        //     "username": "admin",
        //     "avatar": "''",
        //     "admin_role_id": 0
        // }
        const userInfo = {
            id: admin.id,
            username: admin.username,
            avatar: admin.avatar,
            admin_role_id: admin.admin_role_id
        };
        
       // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1NDU4MzMxODN9.lkfMeZBV79b1Ni_8lcMNTXrBbcPD6Vfl59afboRmyMU",
       //  "userInfo": {
       //      "id": 1,
       //      "username": "admin",
       //      "avatar": "''",
       //      "admin_role_id": 0
       //  }
        return this.success({ token: sessionKey, userInfo: userInfo });
    }
};