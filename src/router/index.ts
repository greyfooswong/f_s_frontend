import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Root',
        meta: {
            type: "root"
        },
        component: () => import("@/App.vue"),
        children: [
            {
                path: "/",
                name: "RedirectHome",
                redirect: "/storage/allFile",
                component: () => import("@/views/Front/HomePage.vue"),
                children: [
                    {
                        path: "/storage/:id",
                        name: "Storage",
                        component: () => import("@/views/Front/Storage/Storage.vue"),
                    }
                ]
            },
            {
                path: "/login",
                name: "Login",
                component: () => import("@/views/Front/Login/Login.vue"),
            },
            // 管理后台
            {
                path: "/admin",
                name: "Admin",
                meta: {
                    type: "admin"
                },
                component: () => import("@/views/Admin/AdminHomePage.vue"),
                children: [
                    {
                        path: "",
                        name: "AdminRedirectHome",
                        redirect: "/admin/permission",
                        component: () => import("@/views/Admin/Home/Home.vue"),
                        children: [
                            {
                                path: "file",
                                name: "AdminFile",
                                component: () => import("@/views/Admin/Home/File/File.vue")
                            },
                            {
                                path: "permission",
                                name: "AdminPermission",
                                component: () => import("@/views/Admin/Home/Permission/Permission.vue")
                            },
                            {
                                path: "routing",
                                name: "AdminRouting",
                                component: () => import("@/views/Admin/Home/Routing/Routing.vue")
                            },
                            {
                                path: "user",
                                name: "AdminUser",
                                component: () => import("@/views/Admin/Home/User/User.vue")
                            },
                            {
                                path: "log",
                                name: "AdminLog",
                                component: () => import("@/views/Admin/Home/Log/Log.vue")
                            },
                            {
                                path: "link",
                                name: "AdminLink",
                                component: () => import("@/views/Admin/Home/Link/Link.vue")
                            },
                            {
                                path: "alert",
                                name: "AdminAlert",
                                redirect: "/admin/alert/rules",
                                component: () => import("@/views/Admin/Home/Alert/Alert.vue"),
                                children: [
                                    {
                                        path: "rules",
                                        name: "AdminAlertRules",
                                        component: () => import("@/views/Admin/Home/Alert/AlertRules/AlertRules.vue")
                                    },
                                    {
                                        path: "template",
                                        name: "AdminAlertTemplate",
                                        component: () => import("@/views/Admin/Home/Alert/AlertTemplate/AlertTemplate.vue")
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        path: "login",
                        name: "AdminLogin",
                        component: () => import("@/views/Admin/Login/Login.vue"),
                    },
                ]
            },
        ],
    },
    {
        path: '/:pathMatch(.*)',
        name: "404",
        component: () => import("@/views/404.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
});

export default router;