import React from "react"
import { useTracker } from 'meteor/react-meteor-data';
import InputArea from "./InputArea"
import MyChatItem from "./MyChatItem"
import OtherChatItem from "./OtherChatItem"
import { ChatsCollection } from "../../../api/chats/collection";

export default () => {
    Meteor.subscribe('chatLogs')
    const user = Meteor.user();
    const chats = useTracker(() =>
        ChatsCollection.find({}).fetch()
        , [])

    return <div style={{display: 'flex', flex:'1.5 1 0'}}>
        {user
            ? <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}> 
                <div style={{ display: 'flex', flexDirection: "column" , overflow:'auto'}}>
                    {chats && chats.map(chat => chat.createdBy === user._id
                        ? <MyChatItem key={chat._id} chat={chat} />
                        : <OtherChatItem key={chat._id} chat={chat} />)}
                </div>
                <InputArea />
              </div>
            :
            <div>Please Login</div>
        }
    </div>
}