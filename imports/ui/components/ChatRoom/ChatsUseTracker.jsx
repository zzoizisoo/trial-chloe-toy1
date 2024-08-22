import React, { useState } from "react"
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import InputArea from "./InputArea"
import MyChatItem from "./MyChatItem"
import OtherChatItem from "./OtherChatItem"
import { ChatsCollection } from "../../../api/chats/collection";

// BUG: load more 하면 스크롤이 가장 밑으로 이동.
export default () => {
    const user = useTracker(() => Meteor.user());
    const PAGINATION_SIZE = 5;
    const [pageLength, setPageLength] = useState(PAGINATION_SIZE)

    const isChatLoading = useSubscribe('chatLogs', pageLength)

    const chats = useTracker(() => {
        return ChatsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
    },[pageLength])

    const chatUids = [...new Set(chats.map(c => c.createdBy))]

    const isUserLoading = useSubscribe('usersProfileImgs', chatUids)

    // Chat item에 사용자 프로필 이미지 추가
    const users = useTracker(() => {
        return Meteor.users.find({ _id: { $in: chatUids } }, {
            fields: {
                'profile.profileImgUrl': 1
            }
        }).fetch();
    })

    const result = useTracker(()=>{ 
        if(!isChatLoading() && !isUserLoading()){ 
            return chats.map(chat => {
                const imgUrl = users.find((user) => user._id === chat.createdBy)?.profile?.profileImgUrl
                return imgUrl ? { ...chat, profileImgUrl: imgUrl } : chat
            })
        } else return [];
    })
    
    // console.log('result ', result)

    return <div style={{ display: 'flex', flex: '1.5 1 0' }}>
        {user 
            ? <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: "column-reverse", overflow: 'auto' }}>

                    { result && result.map(chat => chat.createdBy === user._id
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