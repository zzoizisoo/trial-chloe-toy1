import { Meteor } from "meteor/meteor";
import { UserFavorPosts } from "./collection";
import { PostsCollection } from "../posts/collection";

Meteor.methods({
    async addFavorite(postId){
        if(!this.userId) return;

        const post = await PostsCollection.findOneAsync({_id: postId})
        if(!post) return;
        
        await UserFavorPosts.upsertAsync({
            postId: postId,
            userId: this.userId,
        },{
            $set:{
                isFavored: true
            }
        })
    },
    async unFavorite(postId){ 
        if(!this.userId) return;

        const post = await PostsCollection.findOneAsync({_id: postId})
        if(!post) return;

        await UserFavorPosts.updateAsync({postId:postId, userId: this.userId}, {$set: {isFavored: false}})
    }
})