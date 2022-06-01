import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'
import { Login, Welcome, NotFound} from '../views'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "Login | Instabug"
    }
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
    meta: {
      title: "Welcome | Instabug"
    }
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    meta: {
      title: "404 | Instabug"
    }
  },
  {
    path: '*',
    name: 'notFound',
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name !== 'notFound' && to.path !== '/404') {
    let authInfo = localStorage.getItem('authInfo');
    authInfo = JSON.parse(authInfo);
    if(authInfo == null) next();

    else if(authInfo.verified) {
      Store.commit('setActiveEmail', authInfo.email);

      if(to.path !=='/welcome') next('/welcome');
      else next();
    }
    else {
      if(to.path !== '/login') next('/login');
      else next();
    }
  }
  else if (to.name === '404') next();
  else next('/404');
});

export default router