import Vue from 'vue'
import App from './App.vue'
// 导入组件库
// import VAudioPlayer from './../packages/v-audio-player/index.js'
// 注册组件库
// Vue.use(VAudioPlayer)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
