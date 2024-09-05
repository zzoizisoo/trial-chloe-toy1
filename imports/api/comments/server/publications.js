import { Meteor } from "meteor/meteor";
import { CommentsCollection } from "../collection";

Meteor.publish("postComments", function (postId) {
  if (!this.userId) return this.ready();
  return CommentsCollection.find(
    { postId: postId },
    { sort: { createdAt: 1 } }
  );
});
