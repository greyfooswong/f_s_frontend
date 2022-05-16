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
            <el-menu-item index="0">
              <span>全部文件</span>
            </el-menu-item>
            <el-menu-item index="1">
              <span>视频</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span>音频</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span>文件</span>
            </el-menu-item>
            <el-menu-item index="4">
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
import { onMounted } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import Header from "@/components/Header.vue";

const store = useStore();
const router = useRouter();

const { type } = storeToRefs(store);

const selectMenu = (index: string) => {
  store.selectMenu(index);
  store.getFiles(type.value);
  router.push(`/storage/${switchType(index)}`);
}

const switchType = (index: string) => {
  let text = "";
  switch(index){
    case "0":
      text = "allFile";
      break;
    case "1":
      text = "video";
      break;
    case "2":
      text = "audio";
      break;
    case "3":
      text = "file";
      break;
    case "4":
      text = "other";
      break;
    default:
      break;
  }
  return text;
}

onMounted(() => {
  store.getFiles(type.value);
})
</script>