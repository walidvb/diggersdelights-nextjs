import { createLink } from '../db';
import { Context } from 'grammy';
import { addLinkFromMsg } from './addLinkFromMsg';

export const handleShare = async (ctx: Context) => {
  console.log('handleShare')
  const { msg } = ctx
  await addLinkFromMsg(msg, ctx)
};
