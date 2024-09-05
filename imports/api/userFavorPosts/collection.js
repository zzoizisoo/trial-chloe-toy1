import {Mongo} from 'meteor/mongo'

export const UserFavorPosts = new Mongo.Collection('userFavorPosts')

// _id
// postId
// userId
// isFavored