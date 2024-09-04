import { Meteor } from "meteor/meteor";

Meteor.publish('usersProfiles', function(){ 
    return Meteor.users.find({},{fields: {profile:1, emails: 1}})
})

Meteor.publish('usersProfileImgs', function(userIds){ 
    return Meteor.users.find({_id: {$in: userIds}},{fields: {'profile.profileImgUrl': 1}} )
})

Meteor.publish('usersNicknamesProfileImgs', function(userIds){
    return Meteor.users.find(
        {_id: {$in: userIds}},
        {fields: {
            'profile.profileImgUrl': 1, 
            'profile.name': 1
        }}
    )}
)