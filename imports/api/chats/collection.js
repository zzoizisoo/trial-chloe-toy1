import { Mongo } from 'meteor/mongo';
import SimpleSchema from "meteor/aldeed:simple-schema";
import { check } from "meteor/check";

export const ChatsCollection = new Mongo.Collection('chats');

ChatsCollection.schema = new SimpleSchema({ 
    content: String,
    createdBy: String,
    createdAt: {
        type: Date,
        defaultValue: new Date()
    }
}, {check})