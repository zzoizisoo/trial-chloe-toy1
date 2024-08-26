import { Meteor } from "meteor/meteor";
import { CommentsCollection } from "../collection";

Meteor.publish('postComments', function(postId){ 
    return CommentsCollection.find({postId: postId},{sort: {createdAt: 1}})
})