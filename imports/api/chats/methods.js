
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ChatsCollection } from "./collection";

Meteor.methods({
    async sendChatAsync(content){ 
        check(content, String)
        //로그인하지않은 사용자는 채팅할수없음
        console.log('chat message received', content)

        ChatsCollection.insertAsync({ 
            content, 
            createdAt: Date.now(),
            createdBy: this.userId
        }).then((res, err)=>{
            if(err) console.log(err)
            console.log(res)
        })
    }
})