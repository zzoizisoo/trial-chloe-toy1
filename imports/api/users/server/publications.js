import { Meteor } from "meteor/meteor";

Meteor.publish("usersProfiles", function (searchInput) {
  const MAX_LIMIT = 500;
  return Meteor.users.find(
    searchInput
      ? {
          "profile.name": {
            $regex: searchInput,
            $options: "i",
          },
        }
      : {},
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
        _id: 1,
      },
      limit: MAX_LIMIT,
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
