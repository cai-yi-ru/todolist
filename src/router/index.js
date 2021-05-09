import Vue from 'vue';
import VueRouter from 'vue-router';


import Home from '@/components/Home';

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {//如果不是所定義的頁面那就會導入到login頁面，避免進入不存在的頁面
            path:'*',
            redirect:'/'
        },
        {
            name:'home',
            path:'/',//對應的虛擬路徑
            component:Home,//對應的元件
        },
    ]
})