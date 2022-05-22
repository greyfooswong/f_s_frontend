<template>
  <div>
    <PageHead>
      <el-input v-model="keyword" placeholder="搜索您的文件">
        <template #append>
          <el-button :icon="Search" @click="search" />
        </template>
      </el-input>
    </PageHead>
    <span class="inline-block my-4">文件</span>
    <el-table :data="files" style="width: 100%">
      <el-table-column prop="file_name" label="文件名" />
      <el-table-column prop="file_size" label="大小" width="180" />
      <el-table-column prop="modified_on" label="修改时间" width="250">
        <template #default="{ row }">
          {{ formatTime(row.modified_on) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scoped">
          <el-space>
            <el-tag class="cursor-pointer" @click="download(scoped.row)">下载</el-tag>
            <el-tag class="cursor-pointer" type="danger" @click="deleteFile(scoped.row)">删除</el-tag>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { Search } from "@element-plus/icons-vue";
import PageHead from "@/components/PageHead.vue";
import {formatTime, deleteFile as deleteFileApi, uploadFile} from "@/utils";
import {ElMessage} from "element-plus";

const route = useRoute();
const store = useStore();

const { files, type } = storeToRefs(store);
const keyword = ref("");

const download = async (file: any) => {
  // let response = await downloadApi({ file_sha1: file.file_sha1, id: String(file.id) });
  await uploadFile(String(file.file_name), { file_sha1: file.file_sha1, id: String(file.id) });
  // console.log(response);
}

const deleteFile = async (row: any) => {
  console.log(row.id);
  await deleteFileApi(String(row.user_file_id));
  ElMessage.success("删除成功!");
  await store.getFiles(type.value);
}

const search = async () => {
  await store.getFiles(type.value, keyword.value);
}

watchEffect(() => {
  console.log(route.path);
});
</script>