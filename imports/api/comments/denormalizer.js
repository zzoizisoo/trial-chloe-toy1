import { PostsCollection } from "../posts/collection"
import { CommentsCollection } from "./collection"

export const CommentsCountDenormalizer = {
    async _updatePost(postId){ 
        const commentsCount = await CommentsCollection.find({postId}).countAsync()
        await PostsCollection.updateAsync({_id: postId}, { $set: {commentsCount}})
    },
    async afterInsertComment(comment){ 
        await this._updatePost(comment.postId)
    }
}