import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import Button from '@mui/joy/Button';


export default ()=>{ 
    const user = useTracker(() => Meteor.user());

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
                {user 
                    ? <div className='flex' onClick={()=>FlowRouter.go(`/profile/${user._id}`)}>
                        
                        <div>{user.profile?.name}</div>
                        <img style={{width: 40, height:40}} 
                                    src={user.profile?.profileImgUrl || 'https://cdn.vectorstock.com/i/2000v/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.avif'} 
                                    alt=""/>
                     </div> 
                    : <>
                        <Button onClick={()=>FlowRouter.go('login')}>LOG IN</Button>
                        <Button onClick={()=>FlowRouter.go('signup')}>SIGN UP</Button>
                      </>}
            </div>
        </div>
    )
}