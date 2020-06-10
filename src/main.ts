import Vue from 'vue';
import '@/plugins/vuetify';
import App from '@/App.vue';
import store from '@/store';
import '@/registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import VueGtag from "vue-gtag";

Vue.config.productionTip = false;

Vue.use(VueGtag, {
  config: { id: process.env.GOOGLE_ANALYTICS_KEY }
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
