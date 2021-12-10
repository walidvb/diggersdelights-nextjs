import { createLink } from '../db';
import { Context } from 'grammy';
import { addLinkFromMsg } from './addLinkFromMsg';

export const handleShare = async (ctx: Context) => {
  console.log('handleShare')
  const { msg } = ctx
  const { entities } = msg;
  if (!entities.filter(e => e.type === 'url').length) {
    console.log(entities);
    ctx.reply(`Please share a link\nPS: I saw this: ${JSON.stringify({ msg, entities }, null, 2)}`);
    return;
  }
  await addLinkFromMsg(msg, ctx)
};
