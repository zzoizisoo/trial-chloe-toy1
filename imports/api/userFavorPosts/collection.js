import {Mongo} from 'meteor/mongo'
import SimpleSchema from "meteor/aldeed:simple-schema";
import { check } from "meteor/check";
import { PostsCollection } from '../posts/collection';
import { favorCountDenormalizer } from './denormalizer';

class ExtendedUserFavorPosts extends Mongo.Collection {
    async upsertAsync(doc, callback){ 
        const result = await super.upsertAsync(doc, callback)
        await favorCountDenormalizer.afterUpsertAsyncFavorite(doc.postId)
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

