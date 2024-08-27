import React from 'react'
import { UsersPanels, ChatRoom } from '../components';
import PostsList from '../components/PostsList';


export default () => { 
    return <div>
        {/* TODO: 반응형-모바일에서는 d-none, 메뉴 hamberger든 뭐시기든. ...가 아니고 IA 에 다 나와있음 ^^ */}
        <div className='flex' style={{height: 380}}>
            <UsersPanels />
            <ChatRoom />
        </div>
        <PostsList />
    </div>
}