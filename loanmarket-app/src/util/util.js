import CryptoJS from 'crypto-js';
var key = CryptoJS.enc.Utf8.parse("0102030405060708");
var iv = "0102030405060708";
export const encryptPass = function(value) {
  if (!value) {
    throw new Error("需要加密数据不能为空");
  }
  let data = {};
  data.iv = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(iv));
  data.value = CryptoJS.AES.encrypt(value, key, {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC
  }).toString();
  return CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(data))
  );
};
//解密
export const decryptPass = function(ctrptText) {
  if (!ctrptText) {
    throw new Error("密文不能为空");
  }
  let s = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(ctrptText));
  try {
    let j = JSON.parse(s);
    let va = j.value;
    let vi = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(j.iv));
    return CryptoJS.AES.decrypt(va, key, {
      iv: CryptoJS.enc.Utf8.parse(vi),
      mode: CryptoJS.mode.CBC
    }).toString(CryptoJS.enc.Utf8);
  } catch (e) {
    throw new Error(e);
  }
};