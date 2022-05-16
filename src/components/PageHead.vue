<template>
  <div class="pageHead">
    <div class="flex items-center justify-between">
      <el-space>
        <el-upload :before-upload="upload" :show-file-list="false">
          <el-button type="primary">上传</el-button>
        </el-upload>
      </el-space>
      <div class="w-96">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {upload as uploadApi, createFile as createFileApi, createUserFile as createUserFileApi} from "@/utils";
import {useStore} from "@/store";
import {storeToRefs} from "pinia";

const store = useStore();

const { type, user } = storeToRefs(store);

const upload = async (file: any) => {
  let response = await uploadApi(file);
  let res = await createFileApi({ file_sha1: response.FileSha1, file_addr: response.Location, file_size: String(response.FileSIze), file_type: String(response.FileType) });
  await createUserFileApi({user_id: String((user as any).value.id), file_name: response.FileName, file_permission: "0", now_file_id: String(res.id), pre_file_id: String(res.id) });
  await store.getFiles(type.value);
  return false;
}
</script>