import { createLink } from '../db';
import { Context } from 'grammy';
import { Message, MessageEntity } from '@grammyjs/types'

export const addLinkFromMsg = async (msg: Message, ctx: Context) => {
  const { from: user, chat: group, entities, text, message_id: messageID } = msg;
  console.log(entities);
  const urls = convertEntitiesToUrls(entities, text);
  await createLink({ urls, user, group, messageID, text });
  ctx.reply('Thanks for sharing!');
};

const convertEntitiesToUrls = (entities: MessageEntity[], text: string): string[] => {
  return entities.map(entity => {
    const { offset, length, type } = entity
    if (type !== 'url') return
    return text.slice(offset, offset + length)
  }).filter(Boolean)
}