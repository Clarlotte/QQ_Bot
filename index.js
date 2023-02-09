"use strict"
const { createClient } = require("oicq")

//此处填写QQ
const account = 


const bot = createClient(account)

bot.on('system.login.qrcode', function (e) {
  this.logger.mark('扫码后按Enter回车完成登录')
  process.stdin.once('data', () => {
    this.login()
  })
}).login('')//单引号内填写密码

// 提交滑动验证码
bot.on('system.login.slider', function (e) {
  this.logger.mark('请输入获取的ticket，按回车完成【滑动验证】')
  process.stdin.once('data', (input) => {
    this.submitSlider(input)
  })
})

// 设备锁
bot.on('system.login.device', function (e) {
  process.stdin.once('data', () => {
    this.login()
  })
})

// 登录错误
bot.on('system.login.error', function (e) {
  if (e.code == 1) this.logger.error('请打开config.js，修改输入正确的密码')
  process.exit()
})


exports.bot = bot

// 插件名称或者有增减插件，在此修改代码
require("./plugins/plugin-image") //发送图文和表情
require("./plugins/plugin-online") //监听上线事件
require("./plugins/GroupSetting") 

process.on("unhandledRejection", (reason, promise) => {
	console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})
