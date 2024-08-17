import { Meteor } from "meteor/meteor";

Meteor.publish('allUserProfile', function(){ 
    return Meteor.users.find({},{fields: {profile:1, emails: 1}})
})