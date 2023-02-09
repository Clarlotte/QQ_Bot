# QQ_Bot

#### 介绍
此机器人是基于takayama-lily的[oicq](https://github.com/takayama-lily/oicq)进行开发，同时以[oicq-template](https://github.com/takayama-lily/oicq-template)为模板进行功能的调试与开发  
功能插件为与./plugins目录中，账号信息位于./index.js中，目前只支持验证码滑块登录（[获取ticket教程](http://t.csdn.cn/oAGrs)）  
如./plugins中的插件名称或有增减插件行为，务必在./index.js中进行代码的修改，否则会报错  
登录设备变更在./node_modules\oicq\lib中的client.js中
部分功能写得比较粗糙，请谅解  
  
  
**Usage:**

1. 安装 [Node.js](https://nodejs.org/) 14以上版本  
2. clone到本地并执行 `npm i` 安装依赖
3. 将 index.js 第二行 `const account = 0` 中的0改为你自己的账号
4. 执行 `npm run dev` 启动程序

----


