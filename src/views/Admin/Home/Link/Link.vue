<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">链路ID</div>
          <el-input v-model="id" />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">spanID</div>
          <el-input v-model="span_id" />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">parentID</div>
          <el-input v-model="parent_id" />
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
        <el-table-column prop="id" label="链路ID" />
        <el-table-column prop="time_consuming" label="链路耗时" show-overflow-tooltip />
        <el-table-column prop="track_request" label="入参" show-overflow-tooltip />
        <el-table-column prop="track_response" label="出参" show-overflow-tooltip />
        <el-table-column prop="span_id" label="spanID" show-overflow-tooltip />
        <el-table-column prop="parent_id" label="parentID" show-overflow-tooltip />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="show(row.track_request, row.track_response)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 flex justify-center">
        <el-pagination :current-page="pageNumber" @current-change="change" :page-size="pageSize" background layout="prev, pager, next" :total="1000" />
      </div>
    </div>
    <el-dialog v-model="visible">
      <el-form :model="form">
        <el-form-item label="入参" label-width="140px">
          {{ form.input }}
        </el-form-item>
        <el-form-item label="出参" label-width="140px">
          {{ form.output }}
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
import { getTrack as getTrackApi } from "@/utils";
import type { Link } from "@/types";

const list = ref<Array<Link>>([]);
const pageNumber = ref<number>(0);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const visible = ref(false);

const id = ref("");
const span_id = ref("");
const parent_id = ref("");

const form = ref({
  input: "{request: 'sqad', msg: ''}",
  output: "{response: 'sqad', msg: ''}",
});

const change = (page: number) => {
  pageNumber.value = page;
  getList();
}

const getList = async () => {
  let response = await getTrackApi({ page: pageNumber.value.toString(), page_size: pageSize.value.toString(), span_id: span_id.value.toString(), parent_id: parent_id.value.toString(), id: id.value.toString() });
  list.value = response.list;
  total.value = response.pager.total_rows;
  pageNumber.value = response.pager.page;
  pageSize.value = response.pager.page_size;
}

const reset = () => {
  id.value = "";
  span_id.value = "";
  parent_id.value = "";
  getList();
}

const search = () => {
  getList();
}

const show = (input: string, output: string) => {
  form.value = {
    input,
    output
  }
  visible.value = true;
}

onMounted(() => {
  getList();
});
</script>