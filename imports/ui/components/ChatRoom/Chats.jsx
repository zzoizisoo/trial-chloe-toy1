import React, { useState } from "react"
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import MyChatItem from "./MyChatItem"
import OtherChatItem from "./OtherChatItem"
import { ChatsCollection } from "../../../api/chats/collection";

export default () => {
    const user = useTracker(() => Meteor.user(),[]);
    const PAGINATION_SIZE = 5;
    const [pageLength, setPageLength] = useState(PAGINATION_SIZE)

    // CHATS
    const isChatLoading = useSubscribe('chatLogs', pageLength)
    const chats = useTracker(() => ChatsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
        , [pageLength], (prev, next) => prev.length > next.length)


    // PROFILES
    const chatUids = [...new Set(chats.map(c => c.createdBy))]
    const isUserLoading = useSubscribe('usersProfileImgs', chatUids)
    const users = useTracker(() => {
        console.log('calling user fetch')
        return Meteor.users.find({ _id: { $in: chatUids } }, {
            fields: {
                'profile.profileImgUrl': 1
            }
        }).fetch();
    })


    const result = useTracker(() => {
        return chats.map(chat => {
            const imgUrl = users.find((user) => user._id === chat.createdBy)?.profile?.profileImgUrl
            return imgUrl ? { ...chat, profileImgUrl: imgUrl } : chat
        })
    })

    return <div style={{ display: 'flex', flexDirection: "column-reverse", overflow: 'auto' }}>

        {result && result.map(chat => chat.createdBy === user._id
            ? <MyChatItem key={chat._id} chat={chat} imgUrl={chat.profileImgUrl} />
            : <OtherChatItem key={chat._id} chat={chat} imgUrl={chat.profileImgUrl} />)}
        <button onClick={() => setPageLength(pageLength + PAGINATION_SIZE)}>Load more</button>

    </div>

}