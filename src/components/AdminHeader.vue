<template>
  <div class="header h-full w-full bg-white flex items-center justify-between">
    <div class="logo">网盘</div>
    <div>
      <el-button type="danger" @click="logout">退出</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from "@/store";
import { useRouter } from "vue-router";

const store = useAdminStore();
const router = useRouter();

const logout = () => {
  store.logout();
  router.push("/admin/login");
}
</script>