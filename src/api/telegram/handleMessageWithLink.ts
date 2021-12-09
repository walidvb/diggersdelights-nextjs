import { Context } from "grammy"

export const handleMessageWithLink = async (ctx: Context) => {
  await ctx.api.sendMessage(ctx.msg.chat.id, `Save this link to the group's playlist?`, {
    reply_to_message_id: ctx.msg.message_id,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Yes',
            callback_data: 'Yes',
          },
          {
            text: 'No',
            callback_data: 'No',
          },
        ],
      ]
    }
  })
}