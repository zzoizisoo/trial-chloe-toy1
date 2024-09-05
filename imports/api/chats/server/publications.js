import { Meteor } from "meteor/meteor";
import { ChatsCollection } from "../collection";

Meteor.publish("chatLogs", function (limit) {
  if (!this.userId) return this.ready();
  const MAX_CHAT_LIMIT = 1000;
  return ChatsCollection.find(
    {},
    {
      sort: { createdAt: -1 },
      limit: Math.min(limit, MAX_CHAT_LIMIT),
    }
  );
});
