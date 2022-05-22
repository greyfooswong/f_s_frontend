<template>
  <div>
    <div class="w-96 mx-auto mt-72">
      <el-form ref="form" :model="user" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password" />
        </el-form-item>
        <el-form-item>
          <el-space>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="registerVisible = true">注册</el-button>
          </el-space>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog v-model="registerVisible" title="注册" destroy-on-close>
      <el-form ref="registerForm" :model="registerUser" :rules="registerRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerUser.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="registerUser.phone" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="registerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="register">Confirm</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { register as registerApi } from "@/utils";

const form = ref<FormInstance>();
const registerForm = ref<FormInstance>();
const store = useStore();
const router = useRouter();

const registerVisible = ref(false);
let registerUser = reactive({
  username: "",
  password: "",
  email: "",
  phone: "",
});

const checkPhone = (rule: any, value: any, callback: any) => {
  const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
  if (!value) {
    return callback(new Error('电话号码不能为空'))
  }
  setTimeout(() => {
    // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
    // 所以我就在前面加了一个+实现隐式转换

    if (!Number.isInteger(+value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (phoneReg.test(value)) {
        callback()
      } else {
        callback(new Error('电话号码格式不正确'))
      }
    }
  }, 100)
}
const checkEmail = (rule: any, value: any, callback: any) => {
  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  }
  setTimeout(() => {
    if (mailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱格式'))
    }
  }, 100)
}

const registerRules = reactive({
  username: [{ required: true, message: "please enter username!", trigger: "blur" }],
  password: [{ required: true, message: "please enter password!", trigger: "blur" }],
  email: [{ required: true, validator: checkEmail, trigger: "blur" }],
  phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
});
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
      store.login({username: user.username, password: user.password}).then(() => {
        ElMessage.success("登录成功!");
        router.push("/storage/allFile");
      }).catch(() => {
        ElMessage.error("账号或密码错误!");
      });
    } else {
      ElMessage.error("username or password was required!");
    }
  })
}

const register = async () => {
  if (!registerForm) return
  await registerForm.value!.validate(async (valid) => {
    if (valid) {
      await registerApi({ user_name: registerUser.username, user_password: registerUser.password, email: registerUser.email, phone: registerUser.phone });
      await store.login({username: registerUser.username, password: registerUser.password});
      ElMessage.success("登录成功!");
      await router.push("/storage/allFile");
    } else {
      ElMessage.error("username or password was required!");
    }
  })
}
</script>
