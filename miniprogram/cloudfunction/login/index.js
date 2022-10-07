// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const avatars = [
  '../../assets/images/avatar/cat.png',
  '../../assets/images/avatar/eagle.png',
  '../../assets/images/avatar/fish.png',
  '../../assets/images/avatar/fox.png',
  '../../assets/images/avatar/lion.png',
  '../../assets/images/avatar/pig.png',
  '../../assets/images/avatar/sheep.png'
]
const i = Math.floor(Math.random()*7)
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const promise = db.collection('user').where({
      openid: wxContext.OPENID
    }).field({
      'openid': true,
      'nickName': true,
      'avatarUrl': true,
    }).get()
    const res = (await promise).data
    if(res.length){
      return res[0]
    }else{
      throw Error()
    }
  } catch (err) {
    const date = new Date().toJSON()
    const data = {
      openid: wxContext.OPENID,
      nickName: '小程序用户',
      avatarUrl: avatars[i],
    }
    db.collection('user').add({
      data:{
        ...data,
        date
      }
    })
    return data
  }
}