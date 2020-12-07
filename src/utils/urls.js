import environment from "../config/environment";

export default {
  login: `tonginfo/login`, // 登录
  noticeQueryByUser: `tonginfo/staff/notice/queryByUser`, // 查询消息
  noticeById: `tonginfo/staff/notice`, // 查询消息详情
  getInfoByStaff: `tonginfo/staff/getInfoByStaff`, // 查询客户列表
  shopUser: `tonginfo/staff/sales/shopUser`, // 查询客户消费详情
  rankType: `tonginfo/staff/sales/rank`, // 查询员工业绩排行
  salesAll: `tonginfo/staff/sales/all`, // 查询员工业绩
  seaccount: `tonginfo/staff/seaccount/list`, // 查询周报
  workreport: `tonginfo/performana/workreport/list`, // 查询周报、月报
  addWorkreport: `tonginfo/performana/workreport`, // 新增周报、月报
  addSeaccount: `tonginfo/staff/seaccount`, // 新增报销单
  upload: `tonginfo/file/upload/base64`, // 图片上传
  // loginByPass: `${environment.appUrl}staff/getInfoByStaff`, // 登录


}

