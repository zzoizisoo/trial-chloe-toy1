import { Meteor } from "meteor/meteor";

Meteor.methods({
    async updateUserProfileImg(url) {
        console.log(url)
      await Meteor.users.updateAsync({_id:Meteor.userId()},{ 
        $set:{ "profile.profileImgUrl": url}
      });
    },
});