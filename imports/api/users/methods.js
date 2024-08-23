import { Meteor } from "meteor/meteor";

Meteor.methods({
    async updateUserProfileImg(url) {
      await Meteor.users.updateAsync({_id:Meteor.userId()},{ 
        $set:{ "profile.profileImgUrl": url}
      });
    },


    async updateUserProfile(userId, newProfile) {
      if(userId !== this.userId) return;
      const user = await Meteor.users.findOneAsync({_id: userId}) 
      const {name, password, phoneNumber, profileImgUrl} = newProfile 

      try { 
        await Meteor.users.updateAsync({_id: userId}, {
          $set:{ 
            'profile.name' :  name || user.profile.name,
            'profile.phoneNumber' :  phoneNumber || user.profile.phoneNumber,
            'profile.profileImgUrl': profileImgUrl || user.profile.profileImgUrl || '', 
          }
        })
        if(password !== ''){ 
          console.log('passwords are changed')
          await Accounts.setPasswordAsync(userId, password, {logout: false})
        }
        return 200
      } catch(error) { 
        throw new Meteor.Error('Error happened while updating user profile', error)
      }
    }
});