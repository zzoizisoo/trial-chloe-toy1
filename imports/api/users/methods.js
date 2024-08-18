import { Meteor } from "meteor/meteor";

Meteor.methods({
    async updateUserProfileImg(url) {
      await Meteor.users.updateAsync({_id:Meteor.userId()},{ 
        $set:{ "profile.profileImgUrl": url}
      });
    },
});