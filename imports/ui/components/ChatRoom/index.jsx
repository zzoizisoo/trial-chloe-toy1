import React from "react"
import { useTracker } from 'meteor/react-meteor-data';
import InputArea from "./InputArea"
import MyChatItem from "./MyChatItem"
import OtherChatItem from "./OtherChatItem"
import { ChatsCollection } from "../../../api/chats/chats";

export default () => {
    Meteor.subscribe('chatLogs')
    const user = Meteor.user();
    const chats = useTracker(() =>
        ChatsCollection.find({}).fetch()
        , [])

    return <div>
        {user
            ? <><div style={{ display: 'flex', flexDirection: "column" }}>
                {chats && chats.map(chat => chat.createdBy === user._id
                    ? <MyChatItem key={chat._id} chat={chat} />
                    : <OtherChatItem key={chat._id} chat={chat} />)}
               </div>
                <InputArea /></>
            :
            <>Please Login</>
        }
    </div>
}