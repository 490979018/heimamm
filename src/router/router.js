import Vue from 'vue';
import vueRouter from 'vue-router';
import login from '@/views/login/login.vue';
Vue.use(vueRouter);
const router= new vueRouter({
    routes:[
        {path:'/',component:login}
    ]
});

export default router;