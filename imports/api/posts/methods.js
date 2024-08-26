import { Mongo } from 'meteor/mongo';
import { Meteor } from "meteor/meteor";
import { PostsCollection } from "./collection";

Meteor.methods({
    async getPosts() {
      const posts = await PostsCollection.find({}).fetchAsync();
      return posts;
    },

    async getPost(pid){
      const post = await PostsCollection.findOneAsync({_id:pid});
      return post
    }, 

    async addPost({_id, title, description, imageUrl, content}){ 
      // TODOS: add validation
      if(!this.userId) return;

      const postId = await PostsCollection.insertAsync({
        _id: _id || new Mongo.ObjectID()._str,
        title: title,
        description: description,
        imageUrl: imageUrl || null,
        content: content,
        viewCount: 0,
        createdAt: Date.now(),
        createdBy: this.userId
      })
      return postId
    }
});