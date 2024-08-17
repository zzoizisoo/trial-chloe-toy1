import React, {useState} from 'react'
import UserList from './UserList'
import UserDetail from './UserDetail'

export default () => {
    const [selectedUser, setSelectedUser] = useState(undefined)
    const handleSelectUser = (user) => { 
        setSelectedUser(user)
    }

    return <>
        <UserList handleSelectUser={handleSelectUser}/>
        {selectedUser && <UserDetail selectedUser={selectedUser}/> }
    </>
}