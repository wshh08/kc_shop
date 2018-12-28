/**
 * Created by Administrator on 2018/12/26 0026.
 */
const _ = require('lodash');

// 模型并非必须定义，只有当存在独立的业务逻辑或者属性的时候才需要定义

// module.exports既可以通过点语法，也可以直接赋值一个对象。例：module.exports.xxx=xxx 或 module.exports=xxx
module.exports = class extends think.Model {
    //根据订单id获取订单状态，将订单状态转文本
    async getOrderStatusText(orderId) {
        //select * from xbyjshop_order where id = 24;
        const orderInfo = await this.where({id: orderId}).find();
        let statusText = '未付款';
        //orderInfo.order_status:0
        switch (orderInfo.order_status) {
            case 0:
                statusText = '未付款';
                break;
        }

        return statusText;
    }
};