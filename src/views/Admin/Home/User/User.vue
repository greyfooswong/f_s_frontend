<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">用户ID</div>
          <el-input v-model="id" />
        </div>
      </div>
      <div class="mt-4">
        <el-space>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-space>
      </div>
    </div>
    <el-divider />
    <div>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="用户ID" />
        <el-table-column prop="user_name" label="用户名" />
        <el-table-column prop="user_permission_name" label="用户权限" />
        <el-table-column prop="email" label="用户邮箱" />
        <el-table-column prop="phone" label="用户电话" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="show(row.id, row.user_name, row.user_password, row.email, row.phone, row.user_permission_id)">查看</el-button>
            <el-button type="danger" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 flex justify-center">
        <el-pagination :current-page="pageNumber" @current-change="change" :page-size="pageSize" background layout="prev, pager, next" :total="total" />
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
        <el-form-item label="权限" label-width="140px">
          <el-select v-model="form.user_permission_id">
            <el-option v-for="(item, index) in permissionList" :key="index" :label="item.permission_name" :value="item.id" />
          </el-select>
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
          <el-button @click="update">保存</el-button>
          <el-button type="primary" @click="visible = false">返回</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getUsers as getUsersApi, deleteUser as deleteUserApi, updateUser as updateUserApi, getPermissionList as getPermissionListApi } from "@/utils";
import type { User, Permission } from "@/types";
import {ElMessage} from "element-plus";

const list = ref<Array<User>>([]);
const permissionList = ref<Array<Permission>>([]);
const pageNumber = ref<number>(0);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const visible = ref(false);

const id = ref("");

const form = ref({
  id: 1,
  username: "98k",
  password: "1234",
  mail: "123@qq.com",
  phone: "12345678911",
  user_permission_id: 0,
});

const getList = async () => {
  let response = await getUsersApi({ page: pageNumber.value.toString(), page_size: pageSize.value.toString(), id: id.value.toString()});
  list.value = response.list;
  total.value = response.pager.total_rows;
  pageNumber.value = response.pager.page;
  pageSize.value = response.pager.page_size;
}

const getPermission = async () => {
  let response = await getPermissionListApi({ page: "1", page_size: "1000000" });
  permissionList.value = response.list;
}

const change = (page: number) => {
  pageNumber.value = page;
  getList();
}

const reset = () => {
  id.value = "";
  getList();
}

const search = () => {
  getList();
}

const show = (id: number, username: string, password: string, mail: string, phone: string, user_permission_id: number) => {
  form.value = {
    id,
    username,
    password,
    mail,
    phone,
    user_permission_id
  }
  visible.value = true;
}

const del = async (id: number) => {
  await deleteUserApi(id.toString())
  ElMessage.success("删除成功");
  await getList();
}

const update = async () => {
 await updateUserApi({ id: form.value.id.toString(), email: form.value.mail.toString(), phone: form.value.phone.toString(), user_name: form.value.username.toString(), user_password: form.value.password.toString(), user_permission_id: form.value.user_permission_id.toString() });
 ElMessage.success("更新成功");
 await getList();
 visible.value = false;
}

onMounted(() => {
  getList();
  getPermission();
});
</script>