
import { MessageEntity } from '@grammyjs/types';
import { Bot, Context, webhookCallback } from 'grammy';
import { createLink }  from '../../src/api/db'
import createGroup from '../../src/api/db/createGroup';
import { slugifyGroup } from '../../src/shared/helpers/slugifyGroup';

const token = process.env.TELEGRAM_TOKEN
const baseUrl = process.env.BASE_URL

console.log('starting bot', token)
const bot = new Bot(token);

bot.command("share", async (ctx: Context) => {
  console.log('share', JSON.stringify(ctx))
  try{
    const { msg } = ctx
    const { from: user, chat: group, entities, text } = msg;
    ctx.api.sendChatAction(group.id, 'find_location')
    console.log(entities)
    const urls = convertEntitiesToUrls(entities, text)
    if(!urls.length){
      console.log(urls)
      ctx.reply(`Please share a link\nPS: I saw this: ${JSON.stringify({urls, entities})}`)
      return
    }
    await createLink({ urls, user, group })
    ctx.reply('Thanks for sharing!')
  } catch(err){
    console.log(err)
    ctx.reply(`Error! ${JSON.stringify(err)}`)
  }
  console.log('/share')
})

bot.command('play', async (ctx: Context) => {
  console.log('play')
  const { msg } = ctx
  const { chat: group } = msg;
  const slug = slugifyGroup(group)
  const url = `${baseUrl}/groups/${slug}`
  ctx.reply(`Here's a link to have a listen! ${urlToGroup(group)}`)
})

bot.on('message:group_chat_created', async (ctx: Context) => {
  console.log('message:group_chat_created', JSON.stringify(ctx))
  const { chat: group } = ctx
  try{
    await createGroup({ group })
  } catch (err) {
    console.log(err)
    ctx.reply(`Error! ${JSON.stringify(err)}`)
  }
  ctx.reply(`Here's a link to have a listen! ${urlToGroup(group)}`)
}
)
bot.on('message:new_chat_members:me', async (ctx: Context) => {
  console.log('message:new_chat_members:me', JSON.stringify(ctx))
  try{
    const { chat: group } = ctx
    await createGroup({ group })
    ctx.reply(`Bot has been added!`)
    ctx.reply(`Type /share followed by a link to share`)
    ctx.reply(`Type /play to view the library, which will be available at ${urlToGroup(group)}`)
  } catch (err) {
    console.log(err)
    ctx.reply(`Error! ${JSON.stringify(err)}`)
  }
})


export default webhookCallback(bot, 'express', undefined, 5_000)

const convertEntitiesToUrls = (entities: MessageEntity[], text: string): string[] => {
  return entities.map(entity => {
    const { offset, length, type } = entity
    if(type !== 'url') return
    return text.slice(offset, offset + length)
  }).filter(Boolean)
}

const urlToGroup = (group) => `${baseUrl}/groups/${slugifyGroup(group)}`