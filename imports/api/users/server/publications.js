import { Meteor } from "meteor/meteor";

Meteor.publish("usersProfiles", function () {
  return Meteor.users.find(
    {},
    {
      fields: {
        profile: 1,
        emails: 1,
        "status.online": 1,
        "status.lastLogin.date": 1,
      },
      sort: {
        "status.online": -1,
        "status.lastLogin.date": -1,
      },
      limit: 1000,
    }
  );
});

Meteor.publish("usersProfileImgs", function (userIds) {
  return Meteor.users.find(
    { _id: { $in: userIds } },
    { fields: { "profile.profileImgUrl": 1 } }
  );
});

Meteor.publish("usersNicknamesProfileImgs", function (userIds) {
  return Meteor.users.find(
    { _id: { $in: userIds } },
    {
      fields: {
        "profile.profileImgUrl": 1,
        "profile.name": 1,
      },
    }
  );
});
