<template>
  <div>
    <!-- 品牌展示 -->
    <el-card class="box-card">
      <!-- 添加品牌按钮 -->
      <el-button type="primary" icon="Plus" @click="addTradeMark">
        添加品牌
      </el-button>
      <!-- 表格组件，展示品牌数据 -->
      <el-table style="margin: 10px 0" border :data="trademarkArr">
        <el-table-column
          label="序号"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          label="品牌名称"
          align="center"
          prop="tmName"
        ></el-table-column>
        <el-table-column label="品牌LOGO" align="center">
          <template #="{ row, $index }">
            <img
              :src="row.logoUrl"
              alt="找不到图片"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTradeMark(row)"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="deleteTradeMark"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next,jumper,->,sizes,total"
        :total="total"
        @click="changePageNo"
        @size-change="sizeChange"
      />
    </el-card>
    <!-- 新增品牌 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="tradeMarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form style="width: 80%">
        <el-form-item label="品牌名称">
          <el-input
            placeholder="请输入品牌名称"
            label-width="80px"
            v-model="tradeMarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="http://114.115.179.162:8022/prod-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="tradeMarkParams.logoUrl"
              :src="tradeMarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancle">取消</el-button>
        <el-button @click="submit">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  reqHasTrademark,
  reqAddOrUpdateTradeMark,
} from '@/api/product/trademark'
import { ref, onMounted, reactive } from 'vue'
import {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus'

// 当前页码
const pageNo = ref<number>(1)
// 每一页展示多少条数据
const limit = ref<number>(3)

// 定义已有品牌数据数量
const total = ref<number>(0)

// 控制新增页面的显示与隐藏变量
const dialogFormVisible = ref<boolean>(false)
// 引入品牌数据类型

// 定义要展示的品牌数据
const trademarkArr = ref<Records>([])
// 获取品牌接口
const getHasTrademark = async () => {
  const result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}

// 定义收集数据的对象
const tradeMarkParams = reactive<TradeMark>({
  tmName: '111',
  logoUrl: '',
})

// 组件一挂载就发送获取品牌接口请求
onMounted(() => {
  getHasTrademark()
})

// 分页器当前页码发生改变时触发
const changePageNo = () => {
  // 重新发起请求
  getHasTrademark()
}

// 分页展示，一次展示多少条数据
const sizeChange = () => {
  pageNo.value = 1
  getHasTrademark()
}

// 上传品牌
const handleAvatarSuccess = (response: any) => {
  tradeMarkParams.logoUrl = response.data
}

// 添加品牌
const addTradeMark = () => {
  ;(dialogFormVisible.value = true),
    (tradeMarkParams.id = 0),
    (tradeMarkParams.tmName = ''),
    (tradeMarkParams.logoUrl = '')
}

// 修改品牌
const updateTradeMark = (row: TradeMark) => {
  console.log(row)
  ;(dialogFormVisible.value = true),
    // 展示品牌数据
    // tradeMarkParams.id = row.id
    // tradeMarkParams.tmName = row.tmName,
    // tradeMarkParams.logoUrl = row.logoUrl
    Object.assign(tradeMarkParams, row)
}
// 删除品牌
const deleteTradeMark = () => {
  dialogFormVisible.value = true
}

// 取消
const cancle = () => {
  dialogFormVisible.value = false
}
// 提交
const submit = async () => {
  const result: any = await reqAddOrUpdateTradeMark(tradeMarkParams)
  console.log(result)

  if (result.code == 200) {
    // 成功
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: tradeMarkParams.id ? '修改成功' : '添加成功',
    })
    getHasTrademark(tradeMarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: tradeMarkParams.id ? '修改失败' : '添加失败',
    })
    dialogFormVisible.value = false
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
