import { Chat } from "@grammyjs/types";
import slugify from "slugify";

export const slugifyGroup = (group: Chat):string => `${group.type !== 'private' ? slugify(group.title).toLowerCase() : ''}${group.id}`;