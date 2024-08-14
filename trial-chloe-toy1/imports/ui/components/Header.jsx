import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import Button from '@mui/joy/Button';


export default ()=>{ 
    const user = useTracker(() => Meteor.user());

    const login = () => { 
        Meteor.loginWithPassword('Chloe', 'isdoinggreat');
    }

    const logout = () =>{ 
        Meteor.logout()
    }

    return (
        <div className='header'>
            <h1>[Chloe] Toy Project</h1>

            <div>
                {!user ? <Button onClick={login}>Log in</Button> : <Button onClick={logout}>{user?.username}</Button>}
            </div>
        </div>
    )
}