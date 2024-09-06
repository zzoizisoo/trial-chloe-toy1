import { Mongo } from 'meteor/mongo';
import SimpleSchema from "meteor/aldeed:simple-schema";
import { check } from "meteor/check";
import { CommentsCountDenormalizer } from './denormalizer';

// export const CommentsCollection = new Mongo.Collection('comments')

class ExtendedCommentsCollection extends Mongo.Collection { 
    async insertAsync(doc){ 
        const result = await super.insertAsync(doc)
        await CommentsCountDenormalizer.afterInsertComment(doc)
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
