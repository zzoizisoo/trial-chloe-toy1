import { Meteor } from "meteor/meteor";
import { PostsCollection } from "./collection";

Meteor.methods({
    async getPosts() {
      const posts = await PostsCollection.find({}).fetchAsync();
      return posts;
    },
});