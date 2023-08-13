<template>
  <el-card class="box-card">
    <!-- 添加品牌按钮 -->
    <el-button type="primary" icon="Plus">添加品牌</el-button>
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
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
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
    />
  </el-card>
</template>

<script lang="ts" setup>
import { reqHasTrademark } from '@/api/product/trademark'
import { ref, onMounted } from 'vue'
// 当前页码
const pageNo = ref<number>(1)
// 每一页展示多少条数据
const limit = ref<number>(3)

// 定义已有品牌数据数量
const total = ref<number>(0)

// 引入品牌数据类型
import { Records, TradeMarkResponseData } from '@/api/product/trademark/type'
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

// 组件一挂载就发送获取品牌接口请求
onMounted(() => {
  getHasTrademark()
})
</script>

<style lang="scss" scoped></style>
