import { Meteor } from "meteor/meteor";
import { CommentsCollection } from "./collection";

Meteor.methods({
  async addComment({ postId, content }) {
    if (!this.userId) throw new Meteor.Error("not authorized");

    const document = {
      postId,
      content,
      createdBy: this.userId,
      createdAt: new Date(),
    };

    CommentsCollection.schema.validate(document);
    await CommentsCollection.insertAsync(document);
  },

  async getComments(postId) {
    return await CommentsCollection.find({ postId }).fetchAsync();
  },
});
