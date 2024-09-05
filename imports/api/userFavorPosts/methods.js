import { Meteor } from "meteor/meteor";
import { UserFavorPosts } from "./collection";
import { PostsCollection } from "../posts/collection";

Meteor.methods({
    async toggleFavorite(postId, isFavored){
        if(!this.userId) throw new Meteor.Error('unauthorized');
        
        // 서버에는 있지만 클라는 Method로 받기 떄문에 minimongo에 post가 없다. 
        // 그래서 클라이언트에서는 error가 thrown된다.
        if(Meteor.isServer){
            const post = await PostsCollection.findOneAsync({_id: postId})
            if(!post) throw new Meteor.Error('post not exist');
        }   

        const document = {
            postId: postId,
            userId: this.userId,
        }
        const modifier = { 
            $set:{
                isFavored
            }
        }

        UserFavorPosts.schema.validate(document)
        UserFavorPosts.schema.newContext().validate(modifier,{ 
            modifier: true,
            upsert: true
        })
        await UserFavorPosts.upsertAsync(document, modifier)
    },
})