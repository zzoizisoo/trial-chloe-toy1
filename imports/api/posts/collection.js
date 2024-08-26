import { Mongo } from 'meteor/mongo';

export const PostsCollection = new Mongo.Collection('posts')

// const scheme = {
// _id
// title
// description
// imageUrl
// content
// createdBy
// viewCount
// createdAt
//   };