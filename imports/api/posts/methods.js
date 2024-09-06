import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { PostsCollection } from "./collection";
import { UserFavorPosts } from "../userFavorPosts/collection";

Meteor.methods({
  async getPosts() {
    const posts = await PostsCollection.find(
      {},
      { sort: { createdAt: -1 } }
    ).fetchAsync();
    return posts;
  },

  async getFavoritePosts() {
    if (!this.userId) throw new Meteor.Error("anauthorized");
    const userFavoritePosts = await UserFavorPosts.find({
      userId: this.userId,
      isFavored: true,
    }).fetchAsync();
    const postIds = userFavoritePosts.map((item) => item.postId);
    const posts = await PostsCollection.find(
      { _id: { $in: postIds } },
      { sort: { createdAt: -1 } } //여기서는 favorite에 추가된 순서대로 줘야하나? 그럴같은데 🤦‍♀️
    ).fetchAsync();
    return posts;
  },

  async getPost(postId) {
    if (!this.userId)
      throw new Meteor.Error(
        "not authorized",
        "logged in user only view post detail"
      );
    const post = await PostsCollection.findOneAsync({ _id: postId });
    return post;
  },

  async addPost({ _id, title, description, imageUrl, content }) {
    if (!this.userId)
      throw new Meteor.Error("not authorized", "logged in user can write post");

    const document = {
      _id: _id || new Mongo.ObjectID()._str, //TODOS: resolve it later. get ID from stub or change logic
      title,
      description,
      imageUrl,
      content,
      createdAt: new Date(),
      createdBy: this.userId,
    };

    //👇 이걸 왜 자동으로 안해줌
    const cleanDoc = PostsCollection.schema.clean(document);
    return await PostsCollection.insertAsync(cleanDoc);
  },

  async increaseViewCount(postId) {
    if (!this.userId) throw new Meteor.Error("not authorized");

    const modifier = {
      $inc: {
        viewCount: 1,
      },
    };

    const validationContext = PostsCollection.schema.newContext();
    validationContext.validate(modifier, { modifier: true });
    
    return PostsCollection.updateAsync({ _id: postId }, modifier);
  },
});
