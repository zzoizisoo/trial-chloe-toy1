import { Meteor } from "meteor/meteor";
import { CommentsCollection } from "./collection";

Meteor.methods({
    async addComment({postId, content, createdBy}){ 
        if(!this.userId) return; //TODOS: 어케되나 보기
        const comment = await CommentsCollection.insertAsync({
            postId, content, createdBy,
            createdAt: Date.now()
        })
        return comment
    },

    async getComments(postId){ 
        const comments = await CommentsCollection.find({postId: postId}).fetchAsync({})
        return comments
    }
})