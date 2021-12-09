import { Context } from 'grammy';
import { addLinkFromMsg } from './addLinkFromMsg';

export const handleCallbackQuery = async (ctx: Context) => {
  console.log("handleCallbackQuery")
  const { msg: actionMsg, update: { callback_query } } = ctx
  const { data, message: { reply_to_message: originalMsg } } = callback_query
  console.log("data", data)
  if (data === 'No') {
    await ctx.editMessageText(`Ok, skipping...`)
    await ctx.api.deleteMessage(actionMsg.chat.id, actionMsg.message_id)
    return
  }
  console.log("going here?!?")
  await ctx.editMessageText(`Cool, saving...`)
  try{
    await addLinkFromMsg(originalMsg, ctx)
  } catch(err){
    console.log('Error adding link: ', JSON.stringify(err, null, 2))
  }
  await ctx.api.deleteMessage(actionMsg.chat.id, actionMsg.message_id)
}