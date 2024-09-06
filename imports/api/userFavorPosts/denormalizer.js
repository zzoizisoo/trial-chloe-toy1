import { UserFavorPosts } from "./collection"
import { PostsCollection } from "../posts/collection"

export const favorCountDenormalizer = { 
    async _updatePost(postId){ 
        const favorCount = await UserFavorPosts.find({postId, isFavored: true }).countAsync()
        await PostsCollection.updateAsync({_id: postId}, {$set: {favorCount}})
    },
    async afterUpsertAsyncFavorite(userFavorPost){ 
        await this._updatePost(userFavorPost.postId)
    }
}