import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'iview/dist/styles/iview.css';
import Axios from './config/axios';
import $http from './config/api';

Vue.prototype.axios = Axios;
Vue.prototype.$http = $http;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
