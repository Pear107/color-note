import CustomPromise from './customPromise'

type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'TRACE' | 'CONNECT' | undefined

const baseURL = 'https://newgym.cn/colorNote'

function CustomRequest(method: METHOD, url: string, data?: any) {
  return new CustomPromise(function (resolve: Function, reject: Function) {
    const token = wx.getStorageSync('token')
    let header: { [key: string]: string } = {
      'content-type': 'application/x-www-form-urlencoded',
      'token': token,
      // 'Authorization':token
    };
    console.log(baseURL+url)
    if(data){
      data = formatData(data)
    }
    wx.request({
      url: baseURL + url,
      method: method,
      // data: method === 'POST' ? JSON.stringify(data) : data,
      data: data||'',
      header: header,
      success(res: any) {
        //请求成功
        //判断状态码---errCode状态根据后端定义来判断
        console.log(res)
        if (res.data.code === 200) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail(err) {
        //请求失败
        console.log('hello error')
        reject(err)
      }
    })
  })
}

function formatData(data: any) {
  console.log(data)
  let ret: string = ''
  for (let key in data) {
    ret += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`
  }
  ret = ret.substring(0, ret.lastIndexOf('&'));
  console.log(ret)
  return ret
}

export default CustomRequest