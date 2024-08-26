import { Mongo } from 'meteor/mongo';

export const CommentsCollection = new Mongo.Collection('comments')

// const scheme = {
// _id
// postId
// content
// createdBy
// createdAt
// }