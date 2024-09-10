import React, { useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import MyChatItem from "./MyChatItem";
import OtherChatItem from "./OtherChatItem";
import { ChatsCollection } from "../../../api/chats/collection";
import { throttle } from "../../utils";


export default function ChatRoom() {
  const user = useTracker(() => Meteor.user());
  const PAGINATION_SIZE = 20;
  const [pageLength, setPageLength] = useState(PAGINATION_SIZE);

  // CHATS
  const isChatLoading = useSubscribe("chatLogs", pageLength);
  const chats = useTracker(
    () =>
      ChatsCollection.find(
        {},
        { sort: { createdAt: -1 }, limit: pageLength }
      ).fetch(),
    [pageLength],
    (prev, next) => prev.length > next.length
  );

  // PROFILES
  const chatUids = [...new Set(chats.map((c) => c.createdBy))];
  const isUserLoading = useSubscribe("usersProfileImgs", chatUids);
  const users = useTracker(() => {
    return Meteor.users
      .find(
        { _id: { $in: chatUids } },
        {
          fields: {
            "profile.profileImgUrl": 1,
          },
        }
      )
      .fetch();
  });


  const onScroll = throttle(({target:{clientHeight, scrollHeight, scrollTop}}) => { 
    const PAGING_THRESHHOLD = 100;
    if(!isChatLoading() && Math.abs(scrollTop) + clientHeight + PAGING_THRESHHOLD > scrollHeight){
        setPageLength(pageLength + PAGINATION_SIZE)
    }
  }, 1000)


  const chatsWithProfileImg = chats.map((chat) => {
    const imgUrl = users.find((user) => user._id === chat.createdBy)?.profile
      ?.profileImgUrl;
    return imgUrl ? { ...chat, profileImgUrl: imgUrl } : chat;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        overflow: "auto",
      }}
      onScroll={onScroll}
    >
      {chatsWithProfileImg &&
        chatsWithProfileImg.map((chat) =>
          chat.createdBy === user._id ? (
            <MyChatItem
              key={chat._id}
              chat={chat}
              imgUrl={chat.profileImgUrl}
            />
          ) : (
            <OtherChatItem
              key={chat._id}
              chat={chat}
              imgUrl={chat.profileImgUrl}
            />
          )
        )}

    </div>
  );
};
