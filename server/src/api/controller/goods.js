const Base = require('./base.js');
module.exports = class extends Base {
    async detailAction() {
        const model = this.model('category');
        const currentCategory = await model.where({id: this.get('id')}).find();
        const parentCategory = await model.where({id: currentCategory.parent_id}).find();
        const brotherCategory = await model.where({parent_id: currentCategory.parent_id}).select();

        return this.success({
            currentCategory: currentCategory,
            parentCategory: parentCategory,
            brotherCategory: brotherCategory
        });
    }

}