<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="职位">
          <el-input placeholder="请输入职位名称" v-model="keyWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="search"
            :disabled="keyWord ? false : true"
          >
            搜索
          </el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus" @click="addRole">
        添加职位
      </el-button>
      <el-table border style="margin: 10px 0" :data="allRole">
        <el-table-column
          type="index"
          align="center"
          label="#"
        ></el-table-column>
        <el-table-column
          label="ID"
          align="center"
          prop="id"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="职位名称"
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
        <el-table-column label="操作" align="center" width="280px">
          <template #default="{ row }">
            <div>
              <el-button type="primary" size="small" icon="User">
                分配权限
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="editRole(row)"
              >
                编辑
              </el-button>
              <el-button type="primary" size="small" icon="Delete">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNow"
      v-model:page-size="pageNum"
      layout="prev, pager, next, jumper"
      :total="total"
      @current-change="getHasRole"
      background
    />
  </div>
  <!-- 添加与编辑结构 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="roleParams.id ? '编辑职位' : '添加职位'"
  >
    <el-form>
      <el-form-item label="职位名称">
        <el-input
          placeholder="请输入职位"
          v-model="roleParams.roleName"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { reqRoleList, reqAddOrUpdateRole } from '@/api/auth/role'
import { ElMessage } from 'element-plus'
import useLayoutStore from '@/store/setting'

// 当前页码
const pageNow = ref(1)
// 一页展示5条数据
let pageNum = ref(5)
// 数据总数
const total = ref(0)
// 搜索职位关键字
const keyWord = ref('')
// 存储全部role数据
const allRole = ref([])
// 控制对话框的显示与隐藏
const dialogFormVisible = ref(false)
// 存储所有角色信息
const roleParams = reactive({
  roleName: '',
  id: 0,
})
onMounted(() => {
  // 发送请求的方法
  getHasRole()
})
// 引入仓库对象
const useStore = useLayoutStore()
const getHasRole = async (pager = 1) => {
  // 修改当前页码
  pageNow.value = pager
  const result = await reqRoleList(pageNow.value, pageNum.value, keyWord.value)
  if (result.code == 200) {
    total.value = result.data.total
    allRole.value = result.data.records
  }
}
// 搜索
const search = () => {
  getHasRole()
  keyWord.value = ''
}
// 重置
const reset = () => {
  useStore.refresh = !useStore.refresh
}

// 添加职位-弹出框
const addRole = async () => {
  dialogFormVisible.value = true
  Object.assign(roleParams, {
    roleName: '',
  })
}
// 编辑职位
const editRole = (row: any) => {
  dialogFormVisible.value = true
  Object.assign(roleParams, row)
}
const submit = async () => {
  const result = await reqAddOrUpdateRole(roleParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: roleParams.id ? '编辑成功' : '添加成功',
    })
    dialogFormVisible.value = false
    getHasRole(roleParams.id ? pageNow.value : 1)
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
