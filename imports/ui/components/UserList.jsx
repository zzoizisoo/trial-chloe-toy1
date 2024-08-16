import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data';
import React, {useState} from "react"
import SearchBar from './SearchBar';

export default () =>{ 
    Meteor.subscribe('allUserProfile')
    const [searchInput, setSearchInput] = useState('')
    const users = useTracker(() =>  
        Meteor.users.find({
            'profile.name':
                {$regex :searchInput, 
                 $options: 'i'
                }}).fetch()
            ,[searchInput])
    // debounce
    // limit, skip

    const onInputChange = (e)=> {
        setSearchInput(e.target.value)
    }

    return (
        <div> 
            <h2>User List</h2>
            <SearchBar searchInput={searchInput} onInputChange={onInputChange}/>

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