<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">路由ID</div>
          <el-input />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-32">母级路由ID</div>
          <el-input />
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
        <el-table-column prop="id" label="路由ID" />
        <el-table-column prop="path" label="路由路径" />
        <el-table-column prop="parentClassId" label="母级路由ID" />
        <el-table-column prop="permission" label="路由权限" />
        <el-table-column label="操作">
          <template #default>
            <el-button type="primary" @click="visible = true">查看</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 flex justify-center">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </div>
    <el-dialog v-model="visible">
      <el-form :model="form">
        <el-form-item label="路由ID" label-width="140px">
          {{ form.id }}
        </el-form-item>
        <el-form-item label="路由权限" label-width="140px">
          <el-select v-model="form.permission" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
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
    path: "/api/err",
    parentClassId: 10,
    permission: "管理员",
  },
  {
    id: 1,
    path: "/api/path",
    parentClassId: 123,
    permission: "管理员",
  },
  {
    id: 2,
    path: "/api/err1",
    parentClassId: 3,
    permission: "管理员",
  },
  {
    id: 3,
    path: "/api/err2",
    parentClassId: 2,
    permission: "管理员",
  },
  {
    id: 4,
    path: "/api/err3",
    parentClassId: 123,
    permission: "管理员",
  }
]);

const visible = ref(false);

const form = ref({
  id: 1,
  permission: "管理员",
});
</script>