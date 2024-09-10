import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "meteor/aldeed:simple-schema";
import { check } from "meteor/check";

export const PostsCollection = new Mongo.Collection("posts");

PostsCollection.schema = new SimpleSchema(
  {
    title: String,
    description: String,
    content: String,
    createdBy: {
      type: String,
      defaultValue: this.userId, //TODO: check
    },
    createdAt: {
      type: Date,
      defaultValue: new Date(),
    },
    imageUrl: {
      type: String,
      optional: true,
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
    },
  },
  {
    clean: {
      getAutoValues: true,
    },
  },
  { check }
);

if (Meteor.isServer) {
  PostsCollection.createIndexAsync({ createdAt: -1 });
}
