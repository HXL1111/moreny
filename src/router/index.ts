import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '@/views/Home.vue';
import Bill from '@/views/Bill.vue';
import Form from '@/views/Form.vue';
import NotFound from '@/views/NotFound.vue';
import Money from '@/views/Money.vue';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path:'/home/money',
    component:Money
  },
  {
    path: '/bill',
    component: Bill
  },
  {
    path: '/form',
    component: Form
  },
  {
    path: '/*',
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
