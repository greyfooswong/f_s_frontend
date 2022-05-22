<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">告警规则ID</div>
          <el-input v-model="id" />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">告警级别</div>
          <el-select v-model="level">
            <el-option v-for="(items, index) in options" :key="index" :label="items.label" :value="items.value" />
          </el-select>
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
        <el-table-column prop="id" label="告警规则ID" />
        <el-table-column prop="alarm_level" label="告警级别">
          <template #default="{ row }">
            {{ types(row.alarm_level) }}
          </template>
        </el-table-column>
        <el-table-column prop="alarm_per_min_times" label="告警次数" />
        <el-table-column prop="alarm_template_id" label="告警模板ID" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="show(row.id, row.alarm_level)">编辑</el-button>
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
        <el-form-item label="告警规则ID" label-width="140px">
          {{ form.id }}
        </el-form-item>
        <el-form-item label="告警级别" label-width="140px">
          <el-select v-model="form.level" placeholder="Please select a option">
            <el-option v-for="(items, index) in options" :key="index" :label="items.label" :value="items.value" />
          </el-select>
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
import { getAlertRules as getAlertRulesApi, updateAlertRules as updateAlertRulesApi, deleteAlertRules as deleteAlertRulesApi } from "@/utils";
import type { AlertRule } from "@/types";
import { ElMessage } from "element-plus";

const options = [
  {
    label: "info",
    value: 1
  },
  {
    label: "warning",
    value: 2
  },
  {
    label: "debug",
    value: 3
  },
  {
    label: "error",
    value: 4
  },
]

const list = ref<Array<AlertRule>>([]);
const pageNumber = ref<number>(0);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const visible = ref(false);

const id = ref("");
const level = ref("");

const form = ref({
  id: 1,
  level: "1级",
});

const types = (type: number) => {
  let text = "";
  switch(type){
    case 1:
      text = "info";
      break;
    case 2:
      text = "warning";
      break;
    case 3:
      text = "debug";
      break;
    case 4:
      text = "error";
      break;
    default:
      break;
  }
  return text;
}

const getList = async () => {
  let response = await getAlertRulesApi({ page: pageNumber.value.toString(), page_size: pageSize.value.toString(), id: id.value.toString(), alarm_level: level.value.toString() });
  list.value = response.list;
  total.value = response.pager.total_rows;
  pageNumber.value = response.pager.page;
  pageSize.value = response.pager.page_size;
}

const reset = () => {
  id.value = "";
  level.value = "";
  getList();
}

const search = () => {
  getList();
}

const show = (id: number, level: string) => {
  form.value = {
    id,
    level
  }
  visible.value = true;
}

const change = (page: number) => {
  pageNumber.value = page;
  getList();
}

const update = async () => {
  await updateAlertRulesApi({ id: form.value.id.toString(), alarm_level: form.value.level.toString() });
  ElMessage.success("更新成功");
  await getList();
  visible.value = false;
}

const del = async (id: number) => {
 await deleteAlertRulesApi(id.toString());
 ElMessage.success("删除成功");
 await getList();
}

onMounted(() => {
  getList();
});
</script>