import {Mongo} from 'meteor/mongo'
import SimpleSchema from "meteor/aldeed:simple-schema";
import { check } from "meteor/check";

export const UserFavorPosts = new Mongo.Collection('userFavorPosts')

UserFavorPosts.schema = new SimpleSchema({
    postId: String,
    userId: String,
    isFavored: {
        type: Boolean,
        optional: true
    }
})
// _id
// postId
// userId
// isFavored