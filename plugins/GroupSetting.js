"use strict"
const { segment } = require("oicq")
const { bot } = require("../index")

const Admin_Group_Id = 591171738;
// 违禁词惩罚
bot.on("message.group", async function sensitive(msg) {
  let Arr = [/彩票/g, /资料墙/g, /校园墙/g];//发言违禁词
  var length = Arr.length;
  let qq = Number(msg.user_id)
  for (var i = 0; i < length; i++) {
    if (Arr[i].test(msg.raw_message) && msg.group_id == Admin_Group_Id) {
      msg.group.recallMsg(msg);
      msg.group.muteMember(qq, 86400);//禁言的时间单位为秒
      let remsg = [
        segment.at(qq),
        `由于你触发群内关键词，你将被禁言1天，如有疑问，请直接私信群主`,
      ];
      msg.reply(remsg);
      return true;
    }
  }
})
//给予头衔
bot.on("message.group", async function Give_Title(msg) {
  let flag = 0;
  let str = msg.raw_message;
  let regtext = /我要头衔/g;
  let RegArr = [/爸爸/g, /爹/g, /爷爷/g, /群主/g];//头衔违禁词
  var length = RegArr.length;
  let qq = Number(msg.user_id);
  let title = str.slice(4, str.length);
  if (regtext.test(str) && msg.group_id == Admin_Group_Id) {
    if (msg.group.is_owner) {
      if (title.length > 6 || title.length <= 0) {
        msg.reply(`头衔最大长度为6，请重新输入`, true);
        return true;
      } else {
        for (var i = 0; i < length; i++) {
          if (RegArr[i].test(title) && msg.group_id == Admin_Group_Id) {
            msg.group.recallMsg(msg);
            msg.group.muteMember(qq, 1800);
            flag = 1;
            msg.group.setTitle(qq, '');
            let remsg = [
              segment.at(qq),
              `你申请的头衔中包含违禁词，你将被禁言30分钟，并回收你目前的头衔`,
            ];
            msg.reply(remsg)

            return true;
          }
        }
      }
      if (flag == 0) {
        msg.group.setTitle(qq, title);
        msg.reply(`已为你成功将头衔设置为${title}`, true);
        return true;
      }
    }
    else {
      msg.reply(`我不是群主，无法进行头衔的操作`, true);
    }
  }
  else if (msg.raw_message == "我不要头衔了") {
    msg.group.setTitle(qq, '');
    msg.reply(`头衔撤销成功了`, true);
    return true;
  }
})


//群内签到点赞
bot.on("message.group", async function Thumb_Up(msg) {
  let qq = Number(msg.user_id);
  if ((msg.raw_message == "嗷呜" || msg.raw_message == "签到") && msg.group_id == Admin_Group_Id) {
    try {
      //此处为签到黑名单
      if (qq == 3246183973 || qq == 2979987316 || qq == 125117032) {
        return true;
      }
      else {
        let isSuccess = await bot.pickFriend(qq).thumbUp(20);
        console.log(isSuccess);
        if (isSuccess) {
          msg.reply("已为你点赞20次，记得回赞哟", true);
        } else {
          msg.reply("今日已经赞过了,请明天再来", true);
        }
        return true;
      }
    } catch (err) {
      console.log(msg.user_id);
      msg.reply(`原因是\n${err}`, true)
    }
  }
  else if (msg.raw_message == "贴贴" && msg.group_id == 591171738) {
    let remsg = [
      "群主来和你贴贴了",
      segment.face(2),
      segment.face(2),
      segment.face(2),
    ];
    if (qq == 2976842731 || qq == 2181543197)
      msg.reply('贴nm', true);
    else
      msg.reply(remsg, true);
  }
})

//给予管理
bot.on("message.group", async function SetAdmin(msg) {
	let regtext = /设置管理/g;
	if (regtext.test(msg.raw_message) && msg.user_id == Admin_Id && msg.group_id == Admin_Group_Id) {
		let qq = null
		for (let e of msg.message) {
			if (e.type === 'at') {
				qq = e.qq
				break;
			}
		}
		if (qq == null) {
			msg.reply(`未指定需要设置管理的对象`, true);
		} else {
			if (msg.group.pickMember(qq).is_admin) {
				msg.reply(`此人已经是本群的管理了，无法再次设置`, true)
			}
			else {
				msg.group.setAdmin(qq, 1);
				let remsg = [
					`已经成功将`,
					segment.at(qq),
					`设置为本群管理了`,
				];
				msg.reply(remsg, true);
			}
		}
	}
})

//撤销管理
bot.on("message.group", async function RepealAdmin(msg) {
	let regtext = /撤销管理/g;
	if (regtext.test(msg.raw_message) && msg.user_id == Admin_Id && msg.group_id == Admin_Group_Id) {
		let qq = null
		for (let e of msg.message) {
			if (e.type === 'at') {
				qq = e.qq
				break;
			}
		}
		if (qq == null) {
			msg.reply(`未指定需要撤销管理的对象`, true);
		} else {
			if (msg.group.pickMember(qq).is_admin) {
				msg.group.setAdmin(qq, 0);
				let remsg = [
					`已经成功将`,
					segment.at(qq),
					`的管理撤销了`,
				];
				msg.reply(remsg, true);
			}
			else {
				msg.reply(`此人并不是本群的管理，无法进行撤销`, true)
			}
		}
	}
})

//踢出群成员
bot.on("message.group", async function KickaMember(msg) {
	let regtext = /踢/g;
	if (regtext.test(msg.raw_message) && msg.group_id == Admin_Group_Id) {
		if (msg.group.pickMember(msg.user_id).is_admin) {
			let kick_qq = null
			for (let e of msg.message) {
				if (e.type === 'at') {
					kick_qq = e.qq
					break;
				}
			}
			let nickname = await (msg.group.pickMember(kick_qq).nickname || msg.group.pickMember(kick_qq).card)
			if (kick_qq == null) {
				msg.reply(`未指定需要踢出的对象`);
			}
			else {
				if (kick_qq == Admin_Id) {
					msg.reply(`主人无法踢出`, true);

				}
				else if (msg.user_id == Admin_Id && msg.group.is_admin && msg.group.pickMember(kick_qq).is_admin) {
					msg.reply(`权限相同无法踢出`, true);
				}
				else if (msg.user_id != Admin_Id || msg.group.pickMember(kick_qq).is_admin) {
					msg.reply(`对方是管理，你的权限不足，无法踢出`, true);
				}
				else {
					msg.group.kickMember(kick_qq);
					msg.reply(`已经成功将${nickname}(${kick_qq})踢出本群`, true);
				}
			}
		}
		else {
			msg.reply([`你不是这个群里的管理人员，无法进行此操作`]);
		}
	}
})
