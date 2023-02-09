# QQ_Bot

#### 介绍
此机器人是基于takayama-lily的[oicq](https://github.com/takayama-lily/oicq)进行开发，同时以[oicq-template](https://github.com/takayama-lily/oicq-template)为模板进行功能的调试与开发  
功能插件为与./plugins目录中，账号信息位于./index.js中 
如./plugins中的插件名称或有增减插件行为，务必在./index.js中进行代码的修改，否则会报错  
登录设备变更在./node_modules\oicq\lib中的client.js中  
支持的设备如下  
![image](https://user-images.githubusercontent.com/101228920/217761709-2a53dabe-e73b-4393-b554-6a2959bd3830.png)


部分功能写得比较粗糙，请谅解  
  
  
**Usage:**

1. 安装 [Node.js](https://nodejs.org/) 14以上版本  
2. clone到本地并执行 `npm i` 安装依赖
3. 将 index.js 第二行 `const account = 0` 中的0改为你自己的账号，同时将./plugins/GroupSetting.js第5-9行中的信息填写完整。
4. 执行 `npm run dev` 启动程序

[GitHub项目地址](https://github.com/Clarlotte/QQ_Bot)


# 报错解决方案
1. 若扫码登录提示风险，可改为密码登录，密码填写在./index.js中的14行
2. 若提示当前QQ版本过低，修改./data/<登录QQ>/device-<登录QQ>.json中的设备信息，越与原来不一样越好，不要只修改一个参数或一个参数只修改一个字符
