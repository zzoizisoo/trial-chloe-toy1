import { Mongo } from 'meteor/mongo';
import SimpleSchema from "meteor/aldeed:simple-schema";
import { check } from "meteor/check";
import { CommentsCountDenormalizer } from './denormalizer';

class ExtendedCommentsCollection extends Mongo.Collection { 
    async insertAsync(comment){ 
        const result = await super.insertAsync(comment)
        await CommentsCountDenormalizer.afterInsertComment(comment)
        return result
    }
}
export const CommentsCollection = new ExtendedCommentsCollection('comments')

CommentsCollection.schema = new SimpleSchema({
    postId: String,
    content: String, 
    createdBy: String,
    createdAt: Date
}, {check})
