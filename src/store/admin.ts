import { defineStore } from "pinia";
import {User} from "@/types";
import {auth, login} from "@/utils";
import {ElMessage} from "element-plus";

export const useAdminStore = defineStore({
    id: "admin",
    state: () => ({
        type: "file",
        isLogin: false,
        user: {},
    }),
    getters: {

    },
    actions: {
        login(user: User){
            let _this = this;
            return new Promise((resolve, reject) => {
                login(user).then(res => {
                    console.log(res);
                    if(res.user_permission_id != 1){
                        auth().then(response => {
                            _this.user = res;
                            _this.isLogin = true;
                            _this.type = "file";
                            window.sessionStorage.setItem("adminIsLogin", "true");
                            window.sessionStorage.setItem("token", response.token);
                            resolve(true);
                        }).catch(() => {
                            reject(false);
                        });
                    }else{
                        ElMessage.error("非管理员用户无法登录");
                        reject(false);
                    }
                }).catch(() => {
                    reject(false);
                });
            });
        },
        logout(){
            window.sessionStorage.removeItem("adminIsLogin");
            this.isLogin = false;
        },
        selectMenu(type: string){
            this.type = type;
        }
    },
    persist: {
        enabled: true
    }
});
