import { Chat } from '@grammyjs/types';
import { slugifyGroup } from '../../shared/helpers/slugifyGroup';

const baseUrl = process.env.BASE_URL
export const urlToGroup = (group: Chat) => `${baseUrl}/groups/${slugifyGroup(group)}`