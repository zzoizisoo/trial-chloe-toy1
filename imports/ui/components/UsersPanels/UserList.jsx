import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from "react"
import Input from '@mui/joy/Input';
import { IoSearch } from "react-icons/io5";

export default ({
    handleSelectUser
}) => {
    Meteor.subscribe('allUserProfile')
    const [searchInput, setSearchInput] = useState('')

    const users = useTracker(() =>
        //TODO: debounce
        //TODO: limit, skip
        Meteor.users.find({
            'profile.name':
            {
                $regex: searchInput,
                $options: 'i'
            }
        }).fetch()
        , [searchInput]
    )

    const onInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <div style={{flex: '1.5', display: 'flex', flexDirection: 'column'}}>
            <SearchBar searchInput={searchInput} onInputChange={onInputChange} />
            <div style={{display:'flex',flexDirection:'column', overflow: 'auto'}}>
                {/* Bypassing props */}
                {users && users.map(u => <UserListItem handleSelectUser={handleSelectUser} key={u._id} user={u} />)} 
            </div>
        </div>
    )
}


const SearchBar = ({ searchInput, onInputChange }) => {
    return <Input
        value={searchInput}
        onChange={onInputChange}
        endDecorator={<IoSearch />}
    />
}

const UserListItem = ({ user, handleSelectUser }) => {
    return <div key={user._id} onClick={()=>handleSelectUser(user)}>
        <img style={{width: 40, height:40}} src={user.profile?.profileImgUrl || ""} alt=""/>
        {user.profile?.name}
    </div>
}
