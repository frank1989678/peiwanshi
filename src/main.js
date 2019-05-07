import Vue from 'vue'
import App from './App.vue'

import router from './router'

require('./assets/sass/index.scss');

// import './components/preview/index'
import './vue'

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
