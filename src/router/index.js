import {createRouter, createWebHashHistory} from 'vue-router';

const router=createRouter({
    history: createWebHashHistory(),
    routes: [
      {path:'/users', name:'users', component:()=>import("../components/users.vue")},
      {path:'/add', name:'add', component:()=>import("../components/add.vue")},
    ]
});

export default router;