import { Meteor } from "meteor/meteor";

Meteor.publish('allUserProfile', function(){ 
    return Meteor.users.find({},{fields: {profile:1, emails: 1}})
})

Meteor.publish('usersProfileImgs', function(users){ 
    return Meteor.users.find({_id: {$in: users}},{fields: {'profile.profileImgUrl': 1}} )
})