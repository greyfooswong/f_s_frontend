<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">用户ID</div>
          <el-input />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">用户权限</div>
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
        <el-table-column prop="id" label="用户ID" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="permission" label="用户权限" />
        <el-table-column prop="mail" label="用户邮箱" />
        <el-table-column prop="phone" label="用户电话" />
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
        <el-form-item label="用户ID" label-width="140px">
          {{ form.id }}
        </el-form-item>
        <el-form-item label="用户名" label-width="140px">
          {{ form.username }}
        </el-form-item>
        <el-form-item label="用户密码" label-width="140px">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="用户邮箱" label-width="140px">
          <el-input v-model="form.mail" />
        </el-form-item>
        <el-form-item label="用户电话" label-width="140px">
          <el-input v-model="form.phone" />
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
    username: "98k",
    permission: "管理员",
    mail: "123@qq.com",
    phone: "12345678911"
  },
  {
    id: 1,
    username: "222",
    permission: "管理员",
    mail: "123@qq.com",
    phone: "12345678911"
  },
  {
    id: 2,
    username: "333",
    permission: "管理员",
    mail: "123@qq.com",
    phone: "12345678911"
  },
  {
    id: 3,
    username: "98k2",
    permission: "管理员",
    mail: "123@qq.com",
    phone: "12345678911"
  },
  {
    id: 4,
    username: "98k4",
    permission: "管理员",
    mail: "123@qq.com",
    phone: "12345678911"
  }
]);

const visible = ref(false);

const form = ref({
  id: 1,
  username: "98k",
  password: "1234",
  mail: "123@qq.com",
  phone: "12345678911"
});
</script>