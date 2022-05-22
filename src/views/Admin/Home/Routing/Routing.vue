<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">路由ID</div>
          <el-input v-model="id" />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-32">母级路由ID</div>
          <el-input v-model="parent_api_id" />
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
        <el-table-column prop="id" label="路由ID" />
        <el-table-column prop="api_path" label="路由路径" />
        <el-table-column prop="parent_api_id" label="母级路由ID" />
        <el-table-column prop="api_permission_id" label="路由权限id" />
        <el-table-column prop="api_permission_name" label="路由权限名称" />
        <el-table-column label="操作">
          <template #default="{ row }">
<!--            <el-button type="primary" @click="show(row.id)">查看</el-button>-->
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
import { ref, onMounted } from "vue";
import { getRoute as getRouteApi, deleteRoute as deleteRouteApi } from "@/utils";
import type { Routing } from "@/types";
import {ElMessage} from "element-plus";

const list = ref<Array<Routing>>([]);
const pageNumber = ref<number>(0);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const visible = ref(false);

const id = ref("");
const parent_api_id = ref("");

const form = ref({
  id: 1,
  permission: "管理员",
});

const change = (page: number) => {
  pageNumber.value = page;
  getList();
}

const getList = async () => {
  let response = await getRouteApi({ page: pageNumber.value.toString(), page_size: pageSize.value.toString(), id: id.value.toString(), parent_api_id: parent_api_id.value.toString() });
  list.value = response.list;
  total.value = response.pager.total_rows;
  pageNumber.value = response.pager.page;
  pageSize.value = response.pager.page_size;
}

const reset = () => {
  id.value = "";
  parent_api_id.value = "";
  getList();
}

const search = () => {
  getList();
}

const show = (id: number, permission: string) => {
  form.value = {
    id,
    permission
  }

  visible.value = true;
}

const del = async (id: number) => {
 await deleteRouteApi(id.toString())
  ElMessage.success("删除成功");
 await getList();
}

onMounted(() => {
  getList();
});
</script>