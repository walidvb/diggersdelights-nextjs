
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
bot.command("help", wrapInTryCatch(async (ctx: Context) => {
  await ctx.reply([
    'I help keeping a tab on all the marvelous links you guys share with me!',
    'Any time you send a link in this chat, I\'ll ask you if you want to save it. If you do, it will be available in the group\'s dedicated link.',
    'You can type:',
    '/share a_youtube_link – to share a link',
    '/play – to get the link to view all posts',
  ].join('\n'))ﬁ
}))
bot.command('play', wrapInTryCatch(async (ctx: Context) => {
    const { msg } = ctx
    const { chat: group } = msg;
    await ctx.reply(`Here's a link to have a listen!\n${urlToGroup(group)}`)
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
      console.error(err)
    }
  }
}
