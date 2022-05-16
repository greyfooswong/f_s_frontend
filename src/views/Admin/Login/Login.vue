<template>
  <div class="login">
    <div class="w-96 mx-auto mt-80">
      <div class="font-bold text-center mb-6 text-4xl">登录后台</div>
      <el-form ref="form" :model="user" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="user.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password" />
        </el-form-item>
        <el-form-item>
          <el-space>
            <el-button type="primary" @click="login">登录</el-button>
          </el-space>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { useAdminStore } from "@/store";
import { useRouter } from "vue-router";

const form = ref<FormInstance>();
const store = useAdminStore();
const router = useRouter();

const user = reactive({
  username: "",
  password: "",
});

const rules = reactive({
  username: [{ required: true, message: "please enter username!", trigger: "blur" }],
  password: [{ required: true, message: "please enter password!", trigger: "blur" }],
});

const login = async () => {
  if (!form) return
  await form.value!.validate(async (valid) => {
    if (valid) {
      await store.login({username: user.username, password: user.password});
      ElMessage.success("登录成功!");
      await router.push("/admin/file");
    } else {
      ElMessage.error("username or password was required!");
    }
  })
}
</script>