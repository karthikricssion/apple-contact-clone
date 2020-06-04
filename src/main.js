import Vue from 'vue'
import TextareaAutosize from 'vue-textarea-autosize'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(TextareaAutosize)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
