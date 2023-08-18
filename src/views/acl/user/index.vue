<template>
  <div>
    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button>批量删除</el-button>
      <div>
        <!-- 展示用户信息 -->
        <el-table style="margin: 10px 0" border :data="userArr">
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            label="#"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column
            label="ID"
            align="center"
            prop="id"
          ></el-table-column>
          <el-table-column
            label="用户名字"
            align="center"
            prop="username"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="用户名称"
            align="center"
            prop="name"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="用户角色"
            align="center"
            prop="roleName"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="更新时间"
            align="center"
            prop="updateTime"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" align="center" width="400px">
            <template #="{ row }">
              <el-button type="primary" icon="User" @click="setRole(row)">
                分配角色
              </el-button>
              <el-button type="primary" icon="Edit" @click="updateUser(row)">
                编辑角色
              </el-button>
              <el-button type="primary" icon="Delete">删除角色</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNow"
          v-model:page-size="pageNum"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="getHasUser"
          background
        />
      </div>
    </el-card>
    <!-- 添加和编辑用户信息-抽屉 -->
    <el-drawer v-model="drawer">
      <!-- 标题 -->
      <template #header>
        <h4>{{ userParams.id ? '编辑用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input
              placeholder="请输入用户姓名"
              v-model="userParams.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input
              placeholder="请输入用户昵称"
              v-model="userParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" v-if="!userParams.id">
            <el-input
              placeholder="请输入用户密码"
              v-model="userParams.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 分配角色-抽屉 -->
    <el-drawer v-model="drawer2">
      <template #header>
        <h4>分配角色用户(职位)</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="userParams.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="indeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="chekedRole"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="(role, index) in allRole"
                :key="index"
                :label="role"
              >
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer2 = false">取消</el-button>
          <el-button type="primary" @click="confirmClick">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import {
  reqUser,
  reqAddOrUpdateUser,
  reqRoleList,
  reqUpdateRole,
} from '@/api/auth/user'
import { ElMessage } from 'element-plus'
// 当前页
let pageNow = ref(1)

// 一页有几条数据
let pageNum = ref(5)

// 用户总个数
const total = ref(0)
// 存储用户数据的数组
const userArr = ref([])
onMounted(() => {
  getHasUser()
})

// 定义控制抽屉是否打开变量
const drawer = ref(false)
const drawer2 = ref(false)
// 获取用户管理的信息
const getHasUser = async (pager = 1) => {
  // 收集当前页码
  pageNow.value = pager
  const result = await reqUser(pageNow.value, pageNum.value)
  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}

// 收集用户的响应式信息
const userParams = reactive({
  username: '',
  name: '',
  password: '',
})
// 添加用户-按钮
const addUser = () => {
  // 抽屉显示
  drawer.value = true
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
}
// 编辑用户-按钮
const updateUser = (row: any) => {
  // 抽屉显示
  drawer.value = true
  Object.assign(userParams, row)
}

// 取消按钮
const cancel = () => {
  drawer.value = false
}
const save = async () => {
  const result = await reqAddOrUpdateUser(userParams)
  if (result.code == 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userParams.id ? '编辑成功' : '添加成功',
    })
    getHasUser(userParams.id ? pageNow.value : 1)
    window.location.reload()
  } else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '编辑失败' : '添加失败',
    })
  }
}

// 复选框-是否全选
const checkAll = ref(false)
const allRole = ref([])
const chekedRole = ref([])
// 设置复选框-不确定状态
const indeterminate = ref(true)

// 分配角色回调
const setRole = async (row: any) => {
  // 存储用户数据
  Object.assign(userParams, row)
  const result = await reqRoleList(userParams.id)
  if (result.code == 200) {
    allRole.value = result.data.allRolesList
    chekedRole.value = result.data.assignRoles
    drawer2.value = true
  }
}

// 全选回调
const handleCheckAllChange = (val: boolean) => {
  chekedRole.value = val ? allRole.value : []
  indeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  indeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}

// 确认发请求
const confirmClick = async () => {
  // 收集数据
  const data = {
    userId: userParams.id,
    roleIdList: chekedRole.value.map((item) => item.id),
  }
  const result = await reqUpdateRole(data)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '分配职务成功',
    })
    drawer2.value = false
    getHasUser(pageNow.value)
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>
