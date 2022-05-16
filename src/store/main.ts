import { defineStore } from "pinia";
import {login, getFiles as getFilesApi, auth} from "@/utils";
import type {User} from "@/types";

export const useStore = defineStore({
    id: "main",
    state: () => ({
        type: "0",
        isLogin: false,
        files: [],
        user: {},
    }),
    getters: {

    },
    actions: {
        login(user: User){
            let _this = this;
            return new Promise((resolve, reject) => {
                login(user).then(res => {
                    auth().then(response => {
                        _this.user = res;
                        this.isLogin = true;
                        this.type = "0";
                        window.sessionStorage.setItem("token", response.token);
                        window.sessionStorage.setItem("rootIsLogin", "true");
                        resolve(true);
                    }).catch(() => {
                        reject(false);
                    });
                }).catch(() => {
                    reject(false);
                });
            });
        },
        logout(){
            window.sessionStorage.removeItem("rootIsLogin");
            window.sessionStorage.removeItem("token");
            this.isLogin = false;
        },
        selectMenu(type: string){
            this.type = type;
        },
        async getFiles(type: string, file_name?: string){
            let _this = this;
            let response = await getFilesApi({ type, user_id: String((_this.user as any).id), file_name });
            this.files = response.list;
        }
    },
    persist: {
        enabled: true
    }
});
