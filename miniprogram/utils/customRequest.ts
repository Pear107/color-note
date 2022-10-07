import CustomPromise from './customPromise'

type METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'TRACE' | 'CONNECT' | undefined

const baseURL = 'https://newgym.cn/colorNote'

function CustomRequest(method: METHOD, url: string, data: any) {
  return new CustomPromise(function (resolve: Function, reject: Function) {
    const token = wx.getStorageSync('token')
    let header: { [key: string]: string } = {
      "X-WX-SERVICE": "koa-4wnf",
      'content-type': 'application/x-www-form-urlencoded',
      'token': token,
      // 'Authorization':token
    };
    console.log(baseURL+url)
    data = formatData(data)
    return wx.cloud.callContainer({
      "config": {
        "env": "prod-1gewslsrc38b26eb"
      },
      "path": "/api/count",
      "header": header,
      "method": method,
      "data": {
        "action": "inc"
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