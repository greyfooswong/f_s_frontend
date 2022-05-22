<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">权限ID</div>
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
        <el-table-column prop="id" label="权限ID" />
        <el-table-column prop="permission_name" label="权限名" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="show(row.id, row.permission_name)">查看</el-button>
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
          <el-input v-model="form.permissionName" />
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
import { getPermissionList as getPermissionListApi, updatePermission as updatePermissionApi, deletePermission as deletePermissionApi } from "@/utils";
import { ElMessage } from "element-plus";
import { Permission } from "@/types";

const list = ref<Array<Permission>>([]);
const pageNumber = ref<number>(0);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const visible = ref(false);
const id = ref("");

const form = ref({
  id: 1,
  permissionName: "管理员",
});

const reset = () => {
  id.value = "";
  getList();
}

const search = () => {
  getList();
}

const getList = async () => {
  let response = await getPermissionListApi({ page: pageNumber.value.toString(), page_size: pageSize.value.toString(), id: id.value.toString() });
  list.value = response.list;
  total.value = response.pager.total_rows;
  pageNumber.value = response.pager.page;
  pageSize.value = response.pager.page_size;
}

const change = (page: number) => {
  pageNumber.value = page;
  getList();
}

const show = (id: number, name: string) => {
  form.value = {
    id,
    permissionName: name,
  }
  visible.value = true;
}

const update = async () => {
  await updatePermissionApi({ id: form.value.id.toString(), permission_name: form.value.permissionName.toString() });
  ElMessage.success("更新成功");
  await getList();
  visible.value = false;
}

const del = async (id: number) => {
  await deletePermissionApi(id.toString())
  ElMessage.success("删除成功");
  await getList();
}

onMounted(() => {
  getList();
});
</script>