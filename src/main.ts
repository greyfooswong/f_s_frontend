import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import 'element-plus/es/components/message/style/css'
import ElementPlus from 'element-plus';
import store from "@/store";

router.beforeEach(async (to, from, next) => {
   if(to.meta.type === "root"){
      if(window.sessionStorage.getItem("rootIsLogin")){
         await next();
      }else{
         if(to.path !== "/login"){
            await next("/login");
         }else{
            await next();
         }
      }
   }else{
      if(window.sessionStorage.getItem("adminIsLogin")){
         await next();
      }else{
         if(to.path !== "/admin/login"){
            await next("/admin/login");
         }else{
            await next();
         }
      }
   }
});

createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
    .mount('#app');
