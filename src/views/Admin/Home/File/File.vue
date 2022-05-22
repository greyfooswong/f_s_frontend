<template>
  <div>
    <div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div class="w-24">文件ID</div>
          <el-input v-model="id" />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">文件名称</div>
          <el-input v-model="name" />
        </div>
        <div class="flex items-center ml-4">
          <div class="w-24">文件类型</div>
          <el-select v-model="type">
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
      <el-table :data="files" style="width: 100%">
        <el-table-column prop="id" label="文件ID" width="120px" />
        <el-table-column prop="file_name" label="文件名称" />
        <el-table-column prop="file_size" label="文件大小" />
        <el-table-column prop="modified_on" label="文件上传时间" />
        <el-table-column prop="file_sha1" label="文件哈希值" width="400px" />
        <el-table-column prop="file_type" label="文件类型">
          <template #default="scope">
            {{ types(scope.row.file_type) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="show(row.id, row.user_file_id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-4 flex justify-center">
        <el-pagination :current-page="pageNumber" @current-change="change" :page-size="pageSize" background layout="prev, pager, next" :total="total" />
      </div>
    </div>
    <el-dialog v-model="visible">
      <el-form :model="form">
        <el-form-item label="文件ID" label-width="140px">
          {{ form.id }}
        </el-form-item>
        <el-form-item label="用户ID" label-width="140px">
          {{ form.userId }}
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
import { ref, onMounted, computed } from "vue";
import { getUserFile as getUserFilesApi, switchType } from "@/utils";
import { Files } from "@/types";

const options = [
  {
    label: "全部文件",
    value: "全部文件"
  },
  {
    label: "视频",
    value: "视频"
  },
  {
    label: "音频",
    value: "音频"
  },
  {
    label: "文件",
    value: "文件"
  },
  {
    label: "其他",
    value: "其他"
  },
]

const files = ref<Array<Files>>([]);
const pageNumber = ref<number>(0);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const visible = ref(false);

const id = ref("");
const name = ref("");
const type = ref("");

const types = computed(() => switchType);

const form = ref({
  id: 1,
  userId: 123
});

const reset = () => {
  id.value = "";
  name.value = "";
  type.value = "";
  getFiles();
}

const search = () => {
  getFiles();
}

const getFiles = async () => {
  let response = await getUserFilesApi({ page: String(pageNumber.value), page_size: String(pageSize.value), id: id.value, file_name: name.value, file_type: type.value });
  files.value = response.list;
  total.value = response.pager.total_rows;
  pageNumber.value = response.pager.page;
  pageSize.value = response.pager.page_size;
}

const change = (page: number) => {
  pageNumber.value = page;
  getFiles();
}

const show = (id: number, user_id: number) => {
  form.value = {
    id,
    userId: user_id,
  };
  visible.value = true;
}

onMounted(() => {
  getFiles();
})
</script>