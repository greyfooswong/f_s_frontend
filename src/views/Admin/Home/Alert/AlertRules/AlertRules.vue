<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">告警规则ID</div>
          <el-input />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">告警级别</div>
          <el-select>
            <el-option>全部文件</el-option>
            <el-option>视频</el-option>
            <el-option>音频</el-option>
            <el-option>文件</el-option>
            <el-option>其他</el-option>
          </el-select>
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">告警模板</div>
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
        <el-table-column prop="id" label="告警规则ID" />
        <el-table-column prop="level" label="告警级别" />
        <el-table-column prop="number" label="告警次数" />
        <el-table-column prop="templateId" label="告警模板ID" />
        <el-table-column label="操作">
          <template #default>
            <el-button type="primary" @click="visible = true">编辑</el-button>
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
        <el-form-item label="告警规则ID" label-width="140px">
          {{ form.id }}
        </el-form-item>
        <el-form-item label="告警级别" label-width="140px">
          <el-select v-model="form.level" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai" />
            <el-option label="Zone No.2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="告警模板" label-width="140px">
          <el-select v-model="form.templateId" placeholder="Please select a zone">
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
    level: "1级",
    number: 10,
    templateId: 129,
  },
  {
    id: 1,
    level: "1级",
    number: 10,
    templateId: 129,
  },
  {
    id: 2,
    level: "0级",
    number: 10,
    templateId: 129,
  },
  {
    id: 3,
    level: "4级",
    number: 10,
    templateId: 129,
  },
  {
    id: 4,
    level: "3级",
    number: 10,
    templateId: 129,
  }
]);

const visible = ref(false);

const form = ref({
  id: 1,
  level: "1级",
  templateId: "129"
});
</script>