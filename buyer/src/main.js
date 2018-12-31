import Vue from 'vue'
import App from './App'
import store from '@/store'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  store,
  // 扩展运算符（ spread ）是三个点（...），将一个数组转为用逗号分隔的参数序列
  // 此处将App展开之后再和store组成一个新对象。
  ...App
})
app.$mount()
