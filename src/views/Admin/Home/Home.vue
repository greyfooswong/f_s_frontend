<template>
  <div class="adminHome">
    <el-container>
      <el-header style="background: #fff;">
        <AdminHeader />
      </el-header>
      <el-container style="height: calc(100vh - 60px);">
        <el-aside width="200px">
          <el-menu
              :default-active="type"
              class="h-full"
              @select="selectMenu"
          >
            <el-menu-item index="file">
              <span>文件管理</span>
            </el-menu-item>
            <el-menu-item index="permission">
              <span>权限管理</span>
            </el-menu-item>
            <el-menu-item index="routing">
              <span>路由管理</span>
            </el-menu-item>
            <el-menu-item index="user">
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="log">
              <span>日志管理</span>
            </el-menu-item>
            <el-menu-item index="link">
              <span>链路管理</span>
            </el-menu-item>
            <el-sub-menu index="alert">
              <template #title>
                告警管理
              </template>
              <el-menu-item index="alert/rules">
                <span>告警规则</span>
              </el-menu-item>
              <el-menu-item index="alert/template">
                <span>告警模板</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="mt-4">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useAdminStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import AdminHeader from "@/components/AdminHeader.vue";

const store = useAdminStore();
const router = useRouter();

const { type } = storeToRefs(store);

const selectMenu = (index: string) => {
  store.selectMenu(index);
  router.push(`/admin/${index}`);
};
</script>