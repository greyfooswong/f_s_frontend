<template>
  <div class="header h-full w-full bg-white flex items-center justify-between">
    <div class="logo">网盘</div>
    <div>
      <el-button type="danger" @click="logout">退出</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const logout = () => {
  store.logout();
  router.push("/login");
}
</script>