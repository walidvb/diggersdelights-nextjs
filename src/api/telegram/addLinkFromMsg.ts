import { createLink } from '../db';
import { Context } from 'grammy';
import { Message, MessageEntity } from '@grammyjs/types'

export const addLinkFromMsg = async (msg: Message, ctx: Context) => {
  const { from: user, chat: group, entities, text, message_id: messageID } = msg;
  ctx.api.sendChatAction(group.id, 'find_location');
  console.log(entities);
  const urls = convertEntitiesToUrls(entities, text);
  if (!urls.length) {
    console.log(urls);
    ctx.reply(`Please share a link\nPS: I saw this: ${JSON.stringify({ urls, entities })}`);
    return;
  }
  await createLink({ urls, user, group, messageID });
  ctx.reply('Thanks for sharing!');
};

const convertEntitiesToUrls = (entities: MessageEntity[], text: string): string[] => {
  return entities.map(entity => {
    const { offset, length, type } = entity
    if (type !== 'url') return
    return text.slice(offset, offset + length)
  }).filter(Boolean)
}