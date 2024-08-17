
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ChatsCollection } from "./chats";

Meteor.methods({
    async sendChatAsync(content){ 
        check(content, String)
        //로그인하지않은 사용자는 채팅할수없음
        
        ChatsCollection.insertAsync({ 
            content, 
            createdAt: Date.now(),
            createdBy: this.userId
        })
    }
})