<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">啊实打实</el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :rules="rules">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login_btn" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
// 定义一个响应式数据
const loginForm = reactive({ username: 'admin', password: 'atguigu123' })
// 获取小仓库
const useStore = useUserStore()

// 获取路由器
const router = useRouter()

// 登录
const login = async () => {
  try {
    await useStore.userLogin(loginForm)
    router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功',
    })
  } catch (error:any) {
    ElNotification({
      type: 'error',
      message: error.message,
    })
  }
}

// 定义校验规则
const rules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  .login_form {
    position: relative;
    top: 40vh;
    width: 50%;
    right: -20vh;
    background: url('@/assets/images/login_form.png');
    background-size: cover;
  }
  .login_btn {
    width: 100%;
    margin: 0;
  }
}
</style>
