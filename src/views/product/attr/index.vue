<template>
  <div>
    <!-- 三个分类 -->
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select
            v-model="categoryStore.c1Id"
            @change="handler"
            :disabled="scene === 1"
          >
            <el-option
              v-for="(c1, index) in categoryStore.c1Arr"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="categoryStore.c2Id"
            @change="handler2"
            :disabled="scene === 1"
          >
            <el-option
              v-for="(c2, index) in categoryStore.c2Arr"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="categoryStore.c3Id" :disabled="scene === 1">
            <el-option
              v-for="(c3, index) in categoryStore.c3Arr"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 分类内容 -->
    <div v-show="scene == 0">
      <el-card style="margin: 10px 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addAttrArr"
        >
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="attrArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值">
            <template #="{ row, $index }">
              <el-tag
                style="margin: 5px"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{ row, $index }">
              <el-button
                @click="updateAttrArr"
                type="primary"
                icon="Edit"
                circle
              />
              <el-button type="danger" icon="Delete" circle />
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div v-show="scene == 1">
      <el-card style="margin: 10px 0">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input palceholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus">添加属性值</el-button>
        <el-button @click="cancle">取消</el-button>
        <el-table border style="margin: 10px 0; text-align: center">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称"></el-table-column>
          <el-table-column label="属性值操作"></el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref } from 'vue'
// 引入商品分类管理的小仓库
import useCategoryStore from '@/store/modules/category'
import { reqAttr } from '@/api/product/attr'
const categoryStore = useCategoryStore()
onMounted(() => {
  getC1()
})
// 通知仓库获取一级分类的方法
const getC1 = () => {
  categoryStore.getC1()
}

// 一级分类选中值得时候会触发
const handler = () => {
  ;(categoryStore.c2Id = ''),
    (categoryStore.c3Arr = []),
    (categoryStore.c3Id = ''),
    categoryStore.getC2()
}
// 二级分类选中值得时候会触发
const handler2 = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}

// 定义数组来存储分类列表
const attrArr = ref([])
// 监听三级分类ID，如果存在则发请求
watch(
  () => categoryStore.c3Id,
  async () => {
    attrArr.value = []
    if (!categoryStore.c3Id) return
    const { c1Id, c2Id, c3Id } = categoryStore
    const result = await reqAttr(c1Id, c2Id, c3Id)
    if (result.code == 200) {
      attrArr.value = result.data
    }
  },
)

const scene = ref<number>(0)
const addAttrArr = () => {
  scene.value = 1
}
const updateAttrArr = () => {
  scene.value = 1
}
const cancle = () => {
  scene.value = 0
}
</script>

<style lang="scss" scoped></style>
