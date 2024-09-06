import { Meteor } from "meteor/meteor";

Meteor.methods({
  async updateUserProfile(newProfile, newPassword) {
    if (!this.userId) throw new Meteor.Error("anauthorized");

    if(Object.keys(newProfile).length!==0){ 
      await Meteor.users.updateAsync(
        { _id: this.userId },
        {
          $set: newProfile, //document validation?
        }
      )
    }
    if (newPassword && Meteor.isServer) {
      // loginness... 🤦‍♀️
      // 프로필 페이지에서 강제 로그아웃 하면 생기는 문제.
      await Accounts.setPasswordAsync(this.userId, newPassword, {logout: false});
    }
  },

  async getUserInfo(userId) {
    if (!this.userId) throw new Meteor.Error("anauthorized");
    const user = await Meteor.users.findOneAsync({ _id: userId });
    return user;
  },
});
