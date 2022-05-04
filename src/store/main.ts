import { defineStore } from "pinia";

export const useStore = defineStore({
    id: "main",
    state: () => ({
        type: "allFile",
        isLogin: false
    }),
    getters: {

    },
    actions: {
        login(){
            return new Promise(resolve => {
                this.isLogin = true;
                this.type = "allFile";
                window.sessionStorage.setItem("rootIsLogin", "true");
                resolve(true);
            });
        },
        logout(){
            window.sessionStorage.removeItem("rootIsLogin");
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
