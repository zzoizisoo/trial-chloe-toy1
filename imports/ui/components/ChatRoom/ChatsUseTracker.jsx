import React, { useState } from "react"
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import InputArea from "./InputArea"
import MyChatItem from "./MyChatItem"
import OtherChatItem from "./OtherChatItem"
import { ChatsCollection } from "../../../api/chats/collection";
import Chats from "./Chats";

// BUG: load more 하면 스크롤이 가장 밑으로 이동.
export default () => {
    const user = useTracker(() => Meteor.user(),[]);
    
    return <div style={{ display: 'flex', flex: '1.5 1 0' }}>
        {user 
            ? <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <Chats />
                <InputArea />
            </div>
            :
            <div>Please Login</div>
        }
    </div>
}