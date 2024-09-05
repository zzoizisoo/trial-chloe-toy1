import { Mongo } from 'meteor/mongo';
import SimpleSchema from "meteor/aldeed:simple-schema";
import { check } from "meteor/check";

export const PostsCollection = new Mongo.Collection('posts')

PostsCollection.schema = new SimpleSchema({
    _id: String, //TODO LATER...? 
    title: String,
    description: String,
    content: String,
    createdBy: String,
    createdAt: Date,
    imageUrl: {
        type: String,
        optional: true
    },
    viewCount: {
        type: SimpleSchema.Integer,
        defaultValue: 0,
    },
    commentsCount: { 
        type: SimpleSchema.Integer,
        defaultValue: 0,
    },
    favorCount: { 
        type: SimpleSchema.Integer,
        defaultValue: 0,
    }
},{
    clean: {
        getAutoValues: true
    }
} , {check})