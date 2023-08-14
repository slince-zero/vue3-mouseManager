// 品牌管理模块接口
import request from '@/utils/request'
// 引入接口类型
import { TradeMarkResponseData, TradeMark } from './type'
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = 'http://114.115.179.162:8022/prod-api/admin/product/baseTrademark/',
  // 添加品牌
  ADDTRADEMARK_URL = 'http://114.115.179.162:8022/prod-api/admin/product/baseTrademark/save',
  // 修改品牌
  UPDATETRADEMARK_URL = 'http://114.115.179.162:8022/prod-api/admin/product/baseTrademark/update/',
  // 删除品牌
  DELETE_URL = 'http://114.115.179.162:8022/prod-api/admin/product/baseTrademark/remove/',
}

// page：获取第几页，默认第一页
// limit：获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

// 添加和修改
export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  // 修改
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

// 删除
export const reqDeleteTradeMark = (id: number) =>
  request.delete<any,any>(API.DELETE_URL + id)
