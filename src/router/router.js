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
        {path:'/login',component:login,meta:{title:"登录页"}},
        {path:'/home',redirect:'/home/subject',  component:layout,children:[
            {path:'chart',component:chart,meta:{title:"数据列表"}},
            {path:'userList',component:userList,meta:{title:"用户列表"}},
            {path:'question',component:question,meta:{title:"题库列表"}},
            {path:'business',component:business,meta:{title:"企业列表"}},
            {path:'subject',component:subject,meta:{title:"学科列表"}},
        ]},
    ]
});
router.beforeEach((to,from,next)=>{
    Nprogress.start();
    
    setTimeout(()=>{
        next();
    },200)
})
router.afterEach((to,)=>{
    document.title=to.meta.title;
    Nprogress.done();
})

export default router;