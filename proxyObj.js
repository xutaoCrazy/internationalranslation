// console.log(process.env)
var proxyObj = {}
console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case 'development': // 开发环境代理地址
    proxyObj = {
      '/translate': {
        target: 'http://fanyi.youdao.com/translate',
        changOrigin: true,
        pathRewrite: {
          '^/translate': ''
        }
      },
      '/zhload': {
        // target: 'http://172.16.1.85:3000',
        // target: 'http://192.168.1.4:3000',
        target: 'http://172.16.1.230:3000',
        changOrigin: true,
        pathRewrite: {
          '^/zhload': ''
        }
      }
    }
    break
  case 'test': // 测试环境代理地址
    proxyObj = {
      '/zmad': {
        target: 'http://malladmin.vpos.xin/zmad',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/zmad': ''
        }
      },
      '/file': {
        target: 'http://malladmin.vpos.xin/file',
        changOrigin: true,
        pathRewrite: {
          '^/file': '/'
        }
      },
      '/zmsc': {
        target: 'http://malladmin.vpos.xin/zmsc',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/zmsc': ''
        }
      }
    }
    break
  case 'release': // 仿真环境代理地址
    proxyObj = {
      '/zmad': {
        target: 'https://mallwebapp.zcsweb.zcsmart.com.cn/zmad',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/zmad': ''
        }
      },
      '/file': {
        target: 'http://malladmin.zcsweb.zcsmart.com.cn/file',
        changOrigin: true,
        pathRewrite: {
          '^/file': '/'
        }
      }
    }
    break
  case 'produce': // 生产环境代理地址
    proxyObj = {
      '/zmad': {
        target: 'https://mallwebapp.zcsmart.com/zmad',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/zmad': ''
        }
      },
      '/file': {
        target: 'http://malladmin.zcsmart.com/file',
        changOrigin: true,
        pathRewrite: {
          '^/file': '/'
        }
      }
    }
    break
}

module.exports = proxyObj
