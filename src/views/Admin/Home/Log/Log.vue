<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">日志ID</div>
          <el-input v-model="id" />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">日志级别</div>
          <el-select v-model="level">
            <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value" />
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
        <el-table-column prop="id" label="日志ID" />
        <el-table-column prop="log_level" label="日志级别">
          <template #default="{ row }">
            {{ types(row.log_level) }}
          </template>
        </el-table-column>
        <el-table-column prop="log_message" label="日志内容" show-overflow-tooltip />
        <el-table-column prop="log_from" label="日志来源" show-overflow-tooltip />
        <el-table-column prop="modified_by" label="日志时间" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="show(row.id, row.log_message)">查看</el-button>
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
          {{ form.message }}
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="visible = false">返回</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getLogs as getLogsApi } from "@/utils";
import type { Log } from "@/types";

const options = [
  {
    label: "全部",
    value: "全部"
  },
  {
    label: "info",
    value: "1"
  },
  {
    label: "warning",
    value: "2"
  },
  {
    label: "debug",
    value: "3"
  },
  {
    label: "error",
    value: "4"
  },
]

const list = ref<Array<Log>>([]);
const pageNumber = ref<number>(0);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const visible = ref(false);

const id = ref("");
const level = ref("");

const form = ref({
  id: 1,
  message: "log err:sss",
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

const reset = () => {
  id.value = "";
  level.value = "";
  getList();
}

const search = () => {
  getList();
}

const change = (page: number) => {
  pageNumber.value = page;
  getList();
}

const getList = async () => {
  let response = await getLogsApi({ page: pageNumber.value.toString(), page_size: pageSize.value.toString(), log_level: level.value.toString(), id: id.value.toString() });
  list.value = response.list;
  total.value = response.pager.total_rows;
  pageNumber.value = response.pager.page;
  pageSize.value = response.pager.page_size;
}

const show = (id: number, message: string) => {
  form.value = {
    id,
    message
  }
  visible.value = true;
}

onMounted(() => {
  getList();
});
</script>