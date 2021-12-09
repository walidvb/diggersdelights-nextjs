import { Context } from 'grammy';
import createGroup from '../db/createGroup';
import { urlToGroup } from './urlToGroup';

export const handleNewGroup = async (ctx: Context) => {
  const { chat: group } = ctx;
  await createGroup({ group });
  ctx.reply(`Bot has been added!`);
  ctx.reply(`Type /share followed by a link to share`);
  ctx.reply(`Type /play to view the library, which will be available at ${urlToGroup(group)}`);
};
