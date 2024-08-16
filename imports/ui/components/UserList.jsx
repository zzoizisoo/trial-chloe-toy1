import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data';
import React from "react"


export default () =>{ 
    Meteor.subscribe('allUserProfile')
    const users = useTracker(()=>Meteor.users.find({}).fetch())
    
    return (
        <div> 
            <h2>User List</h2>

            <div>
                {users && users.map(u => 
                    <div key={u._id}>
                        {u.profile?.name}
                    </div>
                )}
            </div>
        </div>
    )
}