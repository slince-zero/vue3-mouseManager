<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">啊实打实</el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              v-model="loginForm.password"
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login_btn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'

const loginForm = reactive({ username: 'admin', password: '111111' })
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
