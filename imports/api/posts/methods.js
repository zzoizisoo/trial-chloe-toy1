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

  async upsertPost(newPost) {
    if (!this.userId)
      throw new Meteor.Error("not authorized", "logged in user can write post");

    const document = newPost._id ? {
      ...newPost,
      // updatedAt: new Date(), //이런건 스키마에 없다 
    }: {
      ...newPost,
      createdBy: this.userId,
      createdAt: new Date(),
      // updatedAt: new Date(), // 아직은 말이지 
    };
    
    // upsert schema validation 졸라 골때리네....
    // //👇 이걸 왜 자동으로 안해줌... 걍 넣을게!!!!!!!!!
    const cleanDoc = PostsCollection.schema.clean(document);
    return await PostsCollection.upsertAsync({_id: newPost._id}, { $set: document })
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
