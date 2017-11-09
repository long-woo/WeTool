import http from 'http'

/**
 * get请求
 * @param {*} url 发送请求的url
 */
const get = (url) => {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = ''
      res.on('data', (data) => {
        body += data
      })

      res.on('end', () => {
        resolve(JSON.parse(body))
      })
    })
  })
}

export default {
  get
}
