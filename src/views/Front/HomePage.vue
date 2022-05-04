<template>
  <div class="homepage">
    <el-container>
      <el-header style="background: #fff;">
        <Header />
      </el-header>
      <el-container style="height: calc(100vh - 60px);">
        <el-aside width="200px">
          <el-menu
              :default-active="type"
              class="h-full"
              @select="selectMenu"
          >
            <el-menu-item index="allFile">
              <span>全部文件</span>
            </el-menu-item>
            <el-menu-item index="video">
              <span>视频</span>
            </el-menu-item>
            <el-menu-item index="audio">
              <span>音频</span>
            </el-menu-item>
            <el-menu-item index="file">
              <span>文件</span>
            </el-menu-item>
            <el-menu-item index="other">
              <span>其他</span>
            </el-menu-item>
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
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import Header from "@/components/Header.vue";

const store = useStore();
const router = useRouter();

const { type } = storeToRefs(store);

const selectMenu = (index: string) => {
  store.selectMenu(index);
  router.push(`/storage/${index}`);
}
</script>