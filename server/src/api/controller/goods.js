//导入通用基类，继承里面的方法以及controller中的方法
const Base = require('./base.js');

module.exports = class extends Base {
    /**
     * Created by Administrator on 2018/12/22 0022.
     */
    /**
     * 商品详情页的大家都在看的商品
     * @returns {Promise.<Promise|PreventPromise|void>}
     */
    async relatedAction() {
        // 大家都在看商品,取出关联表的商品，如果没有则随机取同分类下的商品
        //这里的this指的是control
        //controller.model,实例化模型类，获取配置后调用 think.model 方法，多模块项目下会获取当前模块下的配置。
        const model = this.model('goods');
        //获取url上的参数的值
        //如：1006002
        const goodsId = this.get('id');
        //await用于等待一个异步方法执行完成,await只能出现在async函数中
        // select related_goods_id from xbyjshop_related_goods where goods_id = 1006002;结果为空
        //related_goods是空表
        const relatedGoodsIds = await this.model('related_goods').where({goods_id: goodsId}).getField('related_goods_id');
        let relatedGoods = null;
        //true
        if (think.isEmpty(relatedGoodsIds)) {
            // 查找同分类下的商品
            //model.find(option)查询单条数据，返回的数据类型为对象。如果未查询到相关数据，返回值为 {}。
            //select * from xbyjshop_goods where id = 1006002;
            const goodsCategory = await model.where({id: goodsId}).find();
            //goodsCategory.category_id = 1008008
            //select id, name, list_pic_url retail_price from xbyjshop_goods where category_id = 1008008 limit 8;
            relatedGoods = await model.where({category_id: goodsCategory.category_id}).field(['id', 'name', 'list_pic_url', 'retail_price']).limit(8).select();
        } else {
            //select id, name, list_pic_url retail_price from xbyjshop_goods where id in ...;
            relatedGoods = await model.where({id: ['IN', relatedGoodsIds]}).field(['id', 'name', 'list_pic_url', 'retail_price']).select();
        }

        return this.success({
            goodsList: relatedGoods
        });
    }
}