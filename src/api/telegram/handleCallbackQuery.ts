import { Context } from 'grammy';
import { addLinkFromMsg } from './addLinkFromMsg';

export const handleCallbackQuery = async (ctx: Context) => {
  console.log("handleCallbackQuery")
  console.log(ctx)
  const { msg: actionMsg, update: { callback_query } } = ctx
  const { data, message: { reply_to_message: originalMsg } } = callback_query
  if (data === 'No') {
    await ctx.editMessageText(`Ok, skipping...`)
    return
  }
  console.log("going here?!?")
  try{
    await ctx.editMessageText(`Cool, saving...`)
  } catch(err){
    console.log('Error editing message: ', JSON.stringify(err, null, 2))
  }
  try{
    await addLinkFromMsg(originalMsg, ctx)
  } catch(err){
    console.log('Error adding link: ', JSON.stringify(err, null, 2))
  }
  await ctx.editMessageText(`Link Saved! Use /play to view all posts`)
  await new Promise((res, rej) => {
    setTimeout(async () => {
      try{
        await ctx.api.deleteMessage(actionMsg.chat.id, actionMsg.message_id)
        res(null)
      }
      catch(err){
        rej()
      }
    })
  })
}