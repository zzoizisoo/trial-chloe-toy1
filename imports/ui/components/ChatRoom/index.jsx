import React, {useState, useEffect} from "react"
import { useTracker } from 'meteor/react-meteor-data';
import InputArea from "./InputArea"
import MyChatItem from "./MyChatItem"
import OtherChatItem from "./OtherChatItem"
import { ChatsCollection } from "../../../api/chats/collection";

export default () => {
    const PAGINATION_SIZE = 10;
    const [chatsLength, setChatLength] = useState(PAGINATION_SIZE)

    useEffect(()=>{
        Meteor.subscribe('chatLogs', chatsLength)    
    },
    [chatsLength])

    const user = Meteor.user();

    const chats = useTracker(() => {
        const chatData = ChatsCollection.find({},{sort: {createdAt: -1}}).fetch();
        const chatUids = [...new Set(chatData.map(cd => cd.createdBy))]
        const userProfiles = Meteor.users.find({_id: {$in: chatUids}}, {fields:{ 
            'profile.profileImgUrl': 1}
        }).fetch();

        const result = chatData.map(cd => { 
            const imgUrl = userProfiles.find((profile)=>profile._id === cd.createdBy)?.profile?.profileImgUrl
            return imgUrl ? {...cd, profileImgUrl:imgUrl} : cd  
        })
        console.log(result);
        return result
    }, [])



    

    return <div style={{display: 'flex', flex:'1.5 1 0'}}>

        {user
            ? <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}> 
                <div style={{ display: 'flex', flexDirection: "column-reverse" , overflow:'auto'}}>

                    {chats && chats.map(chat => chat.createdBy === user._id
                        ? <MyChatItem key={chat._id} chat={chat} imgUrl={chat.profileImgUrl}/>
                        : <OtherChatItem key={chat._id} chat={chat} imgUrl={chat.profileImgUrl} />)}
                    <button onClick={()=>setChatLength(chatsLength + PAGINATION_SIZE)}>Load more</button>

                </div>
                <InputArea />
              </div>
            :
            <div>Please Login</div>
        }
    </div>
}