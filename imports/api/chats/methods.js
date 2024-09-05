
import { Meteor } from "meteor/meteor";
import { ChatsCollection } from "./collection";

Meteor.methods({
    async sendChatAsync(content){ 
        if(!this.userId) throw new Meteor.Error('sendChatAsync.unauthorized', 'only logged in user can send chat');

        const document= { 
            content,
            createdAt: new Date(),
            createdBy: this.userId
        }

        ChatsCollection.schema.validate(document)
        await ChatsCollection.insertAsync(document)
    }
})