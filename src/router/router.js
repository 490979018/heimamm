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
import store from '@/store/index.js';
import {Message} from 'element-ui';
import {removeToken} from '@/utilis/token.js';
Vue.use(vueRouter);
const router= new vueRouter({
    routes:[
        {path:'/login',component:login,meta:{title:"登录页",rules:["超级管理员","管理员","老师","学生"]}},
        {path:'/home',redirect:'/home/subject',  component:layout,children:[
            {path:'chart',component:chart,meta:{title:"数据列表",rules:["超级管理员","管理员","老师"],icon:"el-icon-pie-chart"}},
            {path:'userList',component:userList,meta:{title:"用户列表",rules:["超级管理员","管理员"],icon:"el-icon-user"}},
            {path:'question',component:question,meta:{title:"题库列表",rules:["超级管理员","管理员","老师"],icon:"el-icon-edit-outline"}},
            {path:'business',component:business,meta:{title:"企业列表",rules:["超级管理员","管理员","老师"],icon:"el-icon-office-building"}},
            {path:'subject',component:subject,meta:{title:"学科列表",rules:["超级管理员","管理员","老师","学生"],icon:"el-icon-notebook-2"}},
        ]},
    ]
});
router.beforeEach((to,from,next)=>{
    Nprogress.start();
    if(!to.meta.rules.includes(store.state.role)){
        Message.warning("你无权访问此列表");
        removeToken("token");
        next("/login");
    }else{
        next();
    }
        
})
router.afterEach((to,)=>{
    document.title=to.meta.title;
    Nprogress.done();
})

export default router;