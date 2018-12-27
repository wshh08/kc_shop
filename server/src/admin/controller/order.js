/**
 * Created by Administrator on 2018/12/26 0026.
 */
const Base = require('./base.js');

module.exports = class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        //从url中获取订单的相关信息
        const page = this.get('page') || 1;
        const size = this.get('size') || 10;
        //订单号
        const orderSn = this.get('orderSn') || '';
        //收货人
        const consignee = this.get('consignee') || '';

        const model = this.model('order');
        //model.page(page, pagesize);设置查询分页，会解析为 limit 数据。page: 设置当前页数, pagesize: 每页条数
        //当page = 1， size = 10, limit第一个参数是偏移量，第二个参数是最大数目
        //countSelect():分页查询，结合page()使用
        //select * from xbyjshop_order where order_sn like '%%' and consignee like '%%' order by id desc limit 0,10;
        const data = await model.where({
            order_sn: ['like', `%${orderSn}%`],
            consignee: ['like', `%${consignee}%`]
        }).order(['id DESC']).page(page, size).countSelect();
        const newList = [];
        //将从数据库中获取的记录每一条根据id得到订单状态文本，将获取的所有记录添加到数组newList中
        for (const item of data.data) {
            item.order_status_text = await this.model('order').getOrderStatusText(item.id);
            newList.push(item);
        }
        data.data = newList;        

        //格式化输出一个正常的数据
        // {
        //     "errno": 0,
        //     "errmsg": "",
        //     "data": {   //data属性是countSelect()的返回结果，类型是{Promise}
        //         "count": 7,//总记录
        //         "totalPages": 1,//总页数
        //         "pageSize": 10,//每页显示的条数
        //         "currentPage": 1,
        //         "data": []
        //      }
        //  }
        return this.success(data);
    }
};