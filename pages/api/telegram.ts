
import { Bot, Context, webhookCallback } from 'grammy';
import { handleCallbackQuery } from '../../src/api/telegram/handleCallbackQuery';
import { handleMessageWithLink } from '../../src/api/telegram/handleMessageWithLink';
import { handleNewGroup } from '../../src/api/telegram/handleNewGroup';
import { handleShare } from '../../src/api/telegram/handleShare';
import { urlToGroup } from '../../src/api/telegram/urlToGroup';

const token = process.env.TELEGRAM_TOKEN

console.log('starting bot', token)
const bot = new Bot(token);

bot.command("share", wrapInTryCatch(handleShare))
bot.command('play', wrapInTryCatch(async (ctx: Context) => {
    const { msg } = ctx
    const { chat: group } = msg;
    await ctx.reply(`Here's a link to have a listen!`)
    await ctx.reply(`${urlToGroup(group)}`)
}))
bot.on('message:group_chat_created', wrapInTryCatch(handleNewGroup))
bot.on('message:new_chat_members:me', wrapInTryCatch(handleNewGroup))
bot.on('::url', wrapInTryCatch(handleMessageWithLink))
bot.on('callback_query:data', wrapInTryCatch(handleCallbackQuery))
bot.on('message', wrapInTryCatch(async (ctx: Context) => {
  console.log('message', JSON.stringify(ctx.msg, null, 2))
}))

export default webhookCallback(bot, 'express', undefined, 5_000)

type wrapped = (ctx: Context) => void
function wrapInTryCatch(func: (ctx: Context) => void): wrapped{
  return async (ctx: Context) => {
    try{
      await func(ctx)
    } catch (err) {
      console.log(err)
      ctx.reply(`Error! ${JSON.stringify(err)}`)
    }
  }
}
