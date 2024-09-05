import { Meteor } from "meteor/meteor";

Meteor.methods({
  async updateUserProfile(newProfile) {
    if (!this.userId) throw new Meteor.Error('anauthorized')
    const user = await Meteor.users.findOneAsync({ _id: this.userId });
    const { name, password, phoneNumber, profileImgUrl } = newProfile;

    try {
      await Meteor.users.updateAsync(
        { _id: this.userId },
        {
          $set: {
            "profile.name": name || user.profile.name,
            "profile.phoneNumber": phoneNumber || user.profile.phoneNumber,
            "profile.profileImgUrl":
              profileImgUrl || user.profile.profileImgUrl || "",
          },
        }
      );
      if (password !== "") {
        console.log("passwords are changed");
        await Accounts.setPasswordAsync(this.userId, password, { logout: false });
      }
      return 200;
    } catch (error) {
      throw new Meteor.Error(
        "Error happened while updating user profile",
        error
      );
    }
  },

  async getUserInfo(userId) {
    if (!this.userId) throw new Meteor.Error('anauthorized');
    const user = await Meteor.users.findOneAsync({ _id: userId });
    return user;
  },
});
