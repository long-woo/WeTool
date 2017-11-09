import crypto from 'crypto'

const key = '#DH-P@ssword!qazXSW@(~A)1&3m0_s%' // key 加密key
const iv = '' // iv 向量

/**
 * 加密
 * @param {*} data 需要加密的数据
 */
const encrypt = (data) => {
  let cipher = crypto.createCipheriv('aes-256-ecb', key, iv)
  let crypted = cipher.update(data, 'utf8', 'base64')

  crypted += cipher.final('base64')
  return crypted
}

/**
 * 解密
 * @param {*} crypted 需要解密的字符
 */
const decrypt = (crypted) => {
  let decipher = crypto.createDecipheriv('aes-256-ecb', key, iv)
  let decoded = decipher.update(crypted, 'base64', 'utf8')

  decoded += decipher.final('utf8')
  return decoded
}

/**
 * 转换为utf8
 * @param {*} data 转换的字符
 */
const toUTF8 = (data) => {
  return Buffer.from(data, 'utf8').toString('utf8')
}

/**
 * 转换base64
 * @param {*} data 转换的字符
 */
const toBase64 = (data) => {
  return Buffer.from(data, 'utf8').toString('base64')
}

export default {
  encrypt,
  decrypt,
  toUTF8,
  toBase64
}
