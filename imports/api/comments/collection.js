import { Mongo } from 'meteor/mongo';
import SimpleSchema from "meteor/aldeed:simple-schema";
import { check } from "meteor/check";

export const CommentsCollection = new Mongo.Collection('comments')

CommentsCollection.schema = new SimpleSchema({
    postId: String,
    content: String, 
    createdBy: String,
    createdAt: Date
}, {check})
