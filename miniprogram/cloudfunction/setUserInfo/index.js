// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const data = {}
  if(event.nickName){
    data.nickName = event.nickName
  }
  if(event.avatarUrl){
    data.avatarUrl = event.avatarUrl
  }
  if(!event.openid){
    return {
      msg: '未登录'
    }
  }
  if(event.openid !== wxContext.OPENID){
    return {
      msg: '信息错误'
    }
  }
  try{
    return await db.collection('user').where({
      openid: event.openid
    }).update({data})
  }catch(err){
    console.log(err)
    return {
      msg: '服务器错误'
    }
  }
}