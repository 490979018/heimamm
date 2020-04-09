import Vue from 'vue';
import vueRouter from 'vue-router';
import login from '@/views/login/login.vue';
import layout from '@/views/home/layout.vue';
Vue.use(vueRouter);
const router= new vueRouter({
    routes:[
        {path:'/',component:login},
        {path:'/home',component:layout},
    ]
});

export default router;