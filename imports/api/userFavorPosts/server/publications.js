import { Meteor } from "meteor/meteor";
import { UserFavorPosts } from "../collection";

// 이름 짓기는 어려워...
Meteor.publish('userFavorPost', function(postId){
    if(!this.userId) return this.ready();
    //find? findOne?
    return UserFavorPosts.find({postId: postId, userId: this.userId})
})
