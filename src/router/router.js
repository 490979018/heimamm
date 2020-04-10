import Vue from 'vue';
import vueRouter from 'vue-router';
import login from '@/views/login/login.vue';
import layout from '@/views/home/layout.vue';
import chart from '@/views/home/chart/chart.vue';
import userList from '@/views/home/userList/userList.vue';
import question from '@/views/home/question/question.vue';
import business from '@/views/home/business/business.vue';
import subject from '@/views/home/subject/subject.vue';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(vueRouter);
const router= new vueRouter({
    routes:[
        {path:'/login',component:login},
        {path:'/home',redirect:'/home/chart',  component:layout,children:[
            {path:'chart',component:chart},
            {path:'userList',component:userList},
            {path:'question',component:question},
            {path:'business',component:business},
            {path:'subject',component:subject},
        ]},
    ]
});
router.beforeEach((to,from,next)=>{
    Nprogress.start();
    setTimeout(()=>{
        next();
    },1000)
})
router.afterEach(()=>{
    Nprogress.done();
})

export default router;