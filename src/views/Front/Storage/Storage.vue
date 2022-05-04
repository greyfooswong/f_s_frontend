<template>
  <div>
    <PageHead>
      <el-input placeholder="搜索您的文件">
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </PageHead>
    <span class="inline-block my-4">文件</span>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="文件名" />
      <el-table-column prop="size" label="大小" width="180" />
      <el-table-column prop="time" label="修改时间" width="250" />
      <el-table-column label="操作" width="250">
        <template #default>
          <el-space>
            <el-tag class="cursor-pointer">下载</el-tag>
            <el-tag class="cursor-pointer" type="danger">删除</el-tag>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import PageHead from "@/components/PageHead.vue";

const route = useRoute();

watchEffect(() => {
  console.log(route.path);
})

const tableData = [
  {
    name: '文件.txt',
    size: '1024',
    time: '2016-05-03',
  },
  {
    name: '文件.txt',
    size: '1024',
    time: '2016-05-03',
  },
  {
    name: '文件.txt',
    size: '1024',
    time: '2016-05-03',
  },
  {
    name: '文件.txt',
    size: '1024',
    time: '2016-05-03',
  },
]

</script>