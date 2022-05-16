import { defineStore } from "pinia";
import {User} from "@/types";
import {login} from "@/utils";

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
                    _this.user = res;
                    _this.isLogin = true;
                    _this.type = "file";
                    window.sessionStorage.setItem("adminIsLogin", "true");
                    resolve(true);
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
