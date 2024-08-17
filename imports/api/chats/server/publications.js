import { Meteor } from "meteor/meteor";
import { ChatsCollection } from "../chats";

Meteor.publish('chatLogs', function(){ 
   return ChatsCollection.find({})
})