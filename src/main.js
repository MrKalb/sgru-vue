import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import {routes} from './routes';
import VueResource from 'vue-resource';
import Cookies from 'vue-cookies';
import VCalendar from 'v-calendar';
import Paginate from 'vue-paginate';
import BootstrapVue from 'bootstrap-vue';
import VueGoogleCharts from 'vue-google-charts';
import AnimateNumber from 'animated-number-vue';
import money from 'vue-money';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Cookies);
Vue.use(VCalendar);
Vue.use(Paginate);
Vue.use(BootstrapVue);
Vue.use(VueGoogleCharts);
Vue.use(AnimateNumber);
Vue.use(money, {precision: 2});

Vue.http.interceptors.push((request, next) => {
  if(request.url == 'http://localhost:8088/logout') {
    request.credentials = false;
  } else {
    request.credentials = true;
    next();
  }
});

const router = new VueRouter({
  routes,
  mode: 'history'
});


new Vue({
  el: '#app',
  router, 
  render: h => h(App)
})
