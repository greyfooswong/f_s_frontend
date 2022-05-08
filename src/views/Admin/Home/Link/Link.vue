<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">链路ID</div>
          <el-input />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">spanID</div>
          <el-input />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">parentID</div>
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
        <el-table-column prop="id" label="链路ID" />
        <el-table-column prop="timeConsuming" label="链路耗时" />
        <el-table-column prop="input" label="入参" />
        <el-table-column prop="output" label="出参" />
        <el-table-column prop="spanId" label="spanID" />
        <el-table-column prop="parentId" label="parentID" />
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
        <el-form-item label="入参" label-width="140px">
          {{ form.input }}
        </el-form-item>
        <el-form-item label="出参" label-width="140px">
          {{ form.output }}
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
    timeConsuming: "31ms",
    input: "{request: 'sqad', msg: ''}",
    output: "{response: 'sqad', msg: ''}",
    spanId: 32133,
    parentId: 1231,
  },
  {
    id: 1,
    timeConsuming: "31ms",
    input: "{request: 'sqad', msg: ''}",
    output: "{response: 'sqad', msg: ''}",
    spanId: 32133,
    parentId: 1231,
  },
  {
    id: 2,
    timeConsuming: "11ms",
    input: "{request: 'sqad', msg: ''}",
    output: "{response: 'sqad', msg: ''}",
    spanId: 32133,
    parentId: 1231,
  },
  {
    id: 3,
    timeConsuming: "0ms",
    input: "{request: 'sqad', msg: ''}",
    output: "{response: 'sqad', msg: ''}",
    spanId: 32133,
    parentId: 1231,
  },
  {
    id: 4,
    timeConsuming: "29ms",
    input: "{request: 'sqad', msg: ''}",
    output: "{response: 'sqad', msg: ''}",
    spanId: 32133,
    parentId: 1231,
  },
]);

const visible = ref(false);

const form = ref({
  input: "{request: 'sqad', msg: ''}",
  output: "{response: 'sqad', msg: ''}",
});
</script>