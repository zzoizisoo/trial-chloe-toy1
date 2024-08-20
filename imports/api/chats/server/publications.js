import { Meteor } from "meteor/meteor";
import { ChatsCollection } from "../collection";

Meteor.publish('chatLogs', function(limit){ 
   return ChatsCollection.find({}, {
      sort: {createdAt: -1},
      limit: limit
   })
})