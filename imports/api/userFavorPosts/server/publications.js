import { Meteor } from "meteor/meteor";
import { UserFavorPosts } from "../collection";

Meteor.publish('userFavorPost', function(postId){
    if(!this.userId) return this.ready();
    //find? findOne?
    return UserFavorPosts.find({postId: postId, userId: this.userId})
})