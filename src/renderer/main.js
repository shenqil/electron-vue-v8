import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import path from 'path'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

let ffi = require('ffi-napi')

const User32 = ffi.Library('user32', {
  'GetWindowLongPtrW': ['int', ['int', 'int']],
  'SetWindowLongPtrW': ['int', ['int', 'int', 'long']],
  'GetSystemMenu': ['int', ['int', 'bool']],
  'DestroyWindow': ['bool', ['int']]
})
console.log(User32.GetWindowLongPtrW)

let libpath = path.join(__static, '/SecurityDll.dll')
console.log(libpath)
const MathFuncDll = ffi.Library(libpath, {
  'sm2Encrypt': ['string', ['string', 'string']], // 国密sm2加密
  'sm4Encrypt': ['string', ['string', 'string']], // 国密sm4加密
  'sm4decrypt': ['string', ['string', 'string']], // 国密sm4解密
  'sm3Data': ['string', ['string']], // 国密sm3
  'commonEncryptKey': ['string', ['string']], // 平台通用密钥解混淆算法
  'hexEncode': ['string', ['string']], // 十六进制编码hex算法
  'sm4EncryptWithOutBaseHex': ['string', ['string', 'string']] // 国密sm4加密不带base64并进行hex算法
})
console.log(MathFuncDll)

let value = 'QwqtMBcApbxAW41n14tnDnLjVWmuHQKbWZQk206NW9s4e8T3TnpOcrax9etl1vuhneTqF/BnPtu5q0Hf6ZiOnbvvWfTX8qf16MXGVLrfVrKguutO0m2x8K2tlg29BPDp9W1SpERsbFxQSH79qLyhuPZRBAGh2YYdWxFWaSinxVMIee9AIsgj/ISmONMQvP4Zrle2F3TJw+iwekVMt2z79zU6DDOYbZlIn78PasmgTdRzue3Pcf69Ngf9/lWdWOULEsSVxN0i4PrkpEQrobMnSBgKjgzAyUN+We4FJFteOpdXjPDl47oAxGlLSziGITLmEqQidpyHzhSjt9tx05Xj02KsaEtskT/dVFHT6gcVmNu0xFGgmM4vPX+Ub1hUjQtSbnQzJv6IiEWtWFJTHpxdgkFE7Y8Jmyk45NIQn05NGVCi7xup5FiuVSzg8Qe5bwFRz5OkAdE31PRygb6IlAT5Z6vn58PLQXTynrLvS7DHjTnZ2GRqvH2c8NrLFsexpnQjUkkMBqJsTkrkI021dvSDbFrl/l58gosmoJmrLTENwbpcSCt6m1vZ/WsSrmpITNkyb2Qzi0w14dgP5qSjZrVoCS+HpKWRO21eqYJz69YyI85K8bIl/BGt8Led/F3Trx01/eFEjLXHSb7ANNC+ZrAGVuvNJ16mA5iyjEllSq/HNtaKpWib558+StpG8NGHRKZp6wuiZ6Sf8BorWZ2xSb28nxxama/LBbHc9LbrKVVD0z8eQ0oSa50ywV6JasUdBYG4WtiWOLP55HN+s29zOU4TBTQeUoeBjSJHHL+eW7ymD68='
console.log(MathFuncDll.sm4decrypt(value, '68597JLxuu989875'))

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
