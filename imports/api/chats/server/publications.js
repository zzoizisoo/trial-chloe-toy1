import { Meteor } from "meteor/meteor";
import { ChatsCollection } from "../collection";

Meteor.publish('chatLogs', function(){ 
   return ChatsCollection.find({})
})