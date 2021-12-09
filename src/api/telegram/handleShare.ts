import { createLink } from '../db';
import { Context } from 'grammy';
import { addLinkFromMsg } from './addLinkFromMsg';

export const handleShare = async (ctx: Context) => {
  const { msg } = ctx
  await addLinkFromMsg(msg, ctx)
};
