function CustomRequest(request: REQUEST) {
  return new Promise((resolve: Function, reject: Function) => {
    const {
      url,
      method = "POST",
      header = {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data = {},
    } = request;
    if (header?.["Content-Type"] === "application/x-www-form-urlencoded") {
      wx.request({
        url,
        method,
        header,
        data: formatData(data),
        success: (res: any) => {
          resolve(res);
        },
        fail: (err: any) => {
          reject(err);
        },
      });
    } else {
      wx.request({
        url,
        method,
        header,
        data,
        success: (res: any) => {
          resolve(res);
        },
        fail: (err: any) => {
          reject(err);
        },
      });
    }
  });
}

function formatData(data: any) {
  let ret: string = "";
  for (let key in data) {
    ret += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`;
  }
  ret = ret.substring(0, ret.lastIndexOf("&"));
  return ret;
}

export default CustomRequest;
