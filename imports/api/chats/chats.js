import './methods'
import { Mongo } from 'meteor/mongo';

export const ChatsCollection = new Mongo.Collection('chats');

// const scheme ={ 
// _id
// content
// createdAt
// createdBy
// }