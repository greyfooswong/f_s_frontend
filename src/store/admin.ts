import { defineStore } from "pinia";

export const useAdminStore = defineStore({
    id: "admin",
    state: () => ({
        type: "permission",
        isLogin: false
    }),
    getters: {

    },
    actions: {
        login(){
            return new Promise(resolve => {
                this.isLogin = true;
                this.type = "permission";
                window.sessionStorage.setItem("adminIsLogin", "true");
                resolve(true);
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
