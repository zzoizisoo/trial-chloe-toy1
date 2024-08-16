import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import Button from '@mui/joy/Button';


export default ()=>{ 
    const user = useTracker(() => Meteor.user());

    const login = () => { 
        Meteor.loginWithPassword('Chloe', 'isdoinggreat');
    }

    const logout = () =>{ 
        Meteor.logout()

        //사실 현재 사용자가 위치하는 페이지에서 user status를 Listening 하고 있다가 상태가 변하면 강제로 리디렉션하는게 더 안전한느낌
        FlowRouter.go('/') 

    }

    return (
        <div className='header'>

            {user && 
            <div>
                <Button onClick={()=>FlowRouter.go('post-write')}>Blog Write</Button>
                <Button onClick={()=>FlowRouter.go(`/favorite/${user._id}`)}>Favorite</Button>
            </div>}


            <h1 onClick={()=>FlowRouter.go('index')}>
                [Chloe] Toy Project
            </h1>

            <div>
                {user ?<Button onClick={logout}>{user?.username}</Button> : <Button onClick={login}>Log in</Button>}
            </div>
        </div>
    )
}