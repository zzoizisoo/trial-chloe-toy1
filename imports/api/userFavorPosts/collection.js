import {Mongo} from 'meteor/mongo'
import SimpleSchema from "meteor/aldeed:simple-schema";
import { check } from "meteor/check";
import { favorCountDenormalizer } from './denormalizer';

class ExtendedUserFavorPosts extends Mongo.Collection {
    async upsertAsync(userFavorPost, callback){ 
        const result = await super.upsertAsync(userFavorPost, callback)
        await favorCountDenormalizer.afterUpsertAsyncFavorite(userFavorPost)
        return result
    }
}
export const UserFavorPosts = new ExtendedUserFavorPosts('userFavorPosts')

UserFavorPosts.schema = new SimpleSchema({
    postId: String,
    userId: String,
    isFavored: {
        type: Boolean,
        optional: true
    }
},{check})

