import Vue from 'vue';
import '@/plugins/vuetify';
import App from '@/App.vue';
import store from '@/store';
import '@/registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
