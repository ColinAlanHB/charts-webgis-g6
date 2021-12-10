import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);
const routes = [
    { path: '/', redirect: '/charts' },
    {
      path: '/g6',
      redirect: '/g6/diagram'
    },
    { path: '/webgis', component: () => import('../views/webgis/index.vue') },
    { path: '/charts', component: () => import('../views/charts/index.vue') },
    { path: '/g6', component: () => import('../views/g6/index.vue'),
    children: [
     
      {
        path: 'diagram',
        component: () => import('../views/g6/diagram/index.vue')
      },
      {
        path: 'overview',
        component: () => import('../views/g6/overview/index.vue')
      },
      {
        path: 'relation',
        component: () => import('../views/g6/relation/index.vue')
      }
    ]},
    { path: '/panel', component: () => import('../views/panel/index.vue') },
  ]
const router = new VueRouter({
    routes
});

export default router;