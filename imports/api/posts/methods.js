import { Meteor } from "meteor/meteor";
import { PostsCollection } from "./posts";

Meteor.methods({
    async getPosts() {
      const posts = await PostsCollection.find({}).fetchAsync();
      return posts;
    },
});