
import { MessageEntity } from '@grammyjs/types';
import { Bot, Context, webhookCallback } from 'grammy';
import { createLink }  from '../../src/api/db'
import createGroup from '../../src/api/db/createGroup';

const token = process.env.TELEGRAM_TOKEN

console.log('starting bot')
const bot = new Bot(token);

bot.command("share", async (ctx: Context) => {
  console.log('share')
  const { msg } = ctx
  const { from: user, chat: group, entities, text } = msg;
  console.log(entities)
  const urls = convertEntitiesToUrls(entities, text)
  if(!urls.length){
    ctx.reply('Please share a link')
    return
  }
  await createLink({ urls, user, group })
  console.log('/share')
})

bot.on('message:new_chat_members:me', async (ctx: Context) => {
  console.log('message:new_chat_members:me')
  const { chat: group } = ctx
  await createGroup({ group })
})


export default webhookCallback(bot, 'express')

const convertEntitiesToUrls = (entities: MessageEntity[], text: string): string[] => {
  return entities.map(entity => {
    const { offset, length, type } = entity
    if(type !== 'url') return
    return text.slice(offset, offset + length)
  }).filter(Boolean)
}