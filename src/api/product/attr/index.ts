// 属性管理相关API
import request from '@/utils/request'
import type { CategoryResponseData } from './type'

enum API {
  CategoryOne_Url = 'http://114.115.179.162:8022/prod-api/admin/product/getCategory1',
  CategoryTwo_Url = 'http://114.115.179.162:8022/prod-api/admin/product/getCategory2/',
  CategoryThree_Url = 'http://114.115.179.162:8022/prod-api/admin/product/getCategory3/',
  Attribute_Url = 'http://114.115.179.162:8022/prod-api/admin/product/attrInfoList/',
  AddAttr_Url = 'http://114.115.179.162:8022/prod-api/admin/product/saveAttrInfo/',
  DeleteAttr_url = 'http://114.115.179.162:8022/prod-api/admin/product/deleteAttr/',
}

export const reqC1 = () => request.get<any,CategoryResponseData>(API.CategoryOne_Url)
export const reqC2 = (category1Id: number|string) => request.get<any,CategoryResponseData>(API.CategoryTwo_Url + category1Id)
export const reqC3 = (category2Id: number|string) => request.get<any,CategoryResponseData>(API.CategoryThree_Url + category2Id)
export const reqAttr = (category1Id: any, category2Id: any, category3Id: any) =>
  request.get(
    API.Attribute_Url + `${category1Id}/${category2Id}/${category3Id}`,
  )
export const reqAddAttr = (data: any) => request.post(API.AddAttr_Url, data)
export const reqDeleteAttr = (attrId: any) =>
  request.delete(API.DeleteAttr_url + attrId)
