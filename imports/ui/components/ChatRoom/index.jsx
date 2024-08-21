import React, { useState, useEffect } from "react"
import { useTracker } from 'meteor/react-meteor-data';
import InputArea from "./InputArea"
import MyChatItem from "./MyChatItem"
import OtherChatItem from "./OtherChatItem"
import { ChatsCollection } from "../../../api/chats/collection";

// TODOS.BUG: 첫 마운트에서는 Profile imgs 가 로드되지않음. 
export default () => {
    const user = useTracker(() => Meteor.user());
    const PAGINATION_SIZE = 10;
    const [pageLength, setPageLength] = useState(PAGINATION_SIZE)
    const [chatUids, setChatUids] = useState([])

    // Page size에 따라 Subscription update
    useEffect(() => { 
        Meteor.subscribe('chatLogs', pageLength)
    },
        [pageLength])

    // Chatting 에 참여한 유저들의 profile subscribe
    useEffect(() => {
        if (chatUids.length > 0) {
            Meteor.subscribe('usersProfileImgs', chatUids)
        }
    }, [chatUids])

    const chats = useTracker(() => {
        const cc = ChatsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
        setChatUids([...new Set(cc.map(c => c.createdBy))])
        return cc;
    }, [])


    // Chat item에 사용자 프로필 이미지 추가
    const chatsWithProfile = useTracker(() => {
        const userProfiles = Meteor.users.find({ _id: { $in: chatUids } }, {
            fields: {
                'profile.profileImgUrl': 1
            }
        }).fetch();

        const result = chats.map(c => {
            const imgUrl = userProfiles.find((profile) => profile._id === c.createdBy)?.profile?.profileImgUrl
            return imgUrl ? { ...c, profileImgUrl: imgUrl } : c
        })
        return result
    }, [chats])

    return <div style={{ display: 'flex', flex: '1.5 1 0' }}>
        {user
            ? <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: "column-reverse", overflow: 'auto' }}>

                    {chatsWithProfile && chatsWithProfile.map(chat => chat.createdBy === user._id
                        ? <MyChatItem key={chat._id} chat={chat} imgUrl={chat.profileImgUrl} />
                        : <OtherChatItem key={chat._id} chat={chat} imgUrl={chat.profileImgUrl} />)}
                    <button onClick={() => setPageLength(pageLength + PAGINATION_SIZE)}>Load more</button>

                </div>
                <InputArea />
            </div>
            :
            <div>Please Login</div>
        }
    </div>
}