
import React from "react"
import { useTracker } from 'meteor/react-meteor-data';

import Chats from "./Chats";
import InputArea from "./InputArea"


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