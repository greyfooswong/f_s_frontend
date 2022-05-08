<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">文件ID</div>
          <el-input />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">文件名称</div>
          <el-input />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">文件类型</div>
          <el-select>
            <el-option>全部文件</el-option>
            <el-option>视频</el-option>
            <el-option>音频</el-option>
            <el-option>文件</el-option>
            <el-option>其他</el-option>
          </el-select>
        </div>
      </div>
      <div class="mt-4">
        <el-space>
          <el-button>查询</el-button>
          <el-button>重置</el-button>
        </el-space>
      </div>
    </div>
    <el-divider />
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="文件ID" />
        <el-table-column prop="fileName" label="文件名称" />
        <el-table-column prop="size" label="文件大小" />
        <el-table-column prop="uploadTime" label="文件上传时间" />
        <el-table-column prop="hash" label="文件哈希值" />
        <el-table-column prop="type" label="文件类型" />
        <el-table-column label="操作">
          <template #default>
            <el-button type="primary" @click="visible = true">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 flex justify-center">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </div>
    <el-dialog v-model="visible">
      <el-form :model="form">
        <el-form-item label="文件ID" label-width="140px">
          {{ form.id }}
        </el-form-item>
        <el-form-item label="用户ID" label-width="140px">
          {{ form.userId }}
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">保存</el-button>
          <el-button type="primary" @click="visible = false">返回</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tableData = ref([
  {
    id: 0,
    fileName: "管ghsff理员",
    size: "102M",
    uploadTime: "2019-12-12 12:30",
    hash: "XXXXXX",
    type: "视频",
  },
  {
    id: 1,
    fileName: "rqwerq",
    size: "102M",
    uploadTime: "2019-12-12 12:30",
    hash: "XXXXXX",
    type: "文件",
  },
  {
    id: 2,
    fileName: "fadsfqwe",
    size: "102M",
    uploadTime: "2019-12-12 12:30",
    hash: "XXXXXX",
    type: "音频",
  },
  {
    id: 3,
    fileName: "管fdsarewq理员",
    size: "102M",
    uploadTime: "2019-12-12 12:30",
    hash: "XXXXXX",
    type: "其他",
  },
  {
    id: 4,
    fileName: "fdsafs",
    size: "102M",
    uploadTime: "2019-12-12 12:30",
    hash: "XXXXXX",
    type: "视频",
  }
]);

const visible = ref(false);

const form = ref({
  id: 1,
  userId: 123
});
</script>