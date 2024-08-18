import React from "react"
import { FaPhone } from "react-icons/fa6";
import { AiFillMail } from "react-icons/ai";
import ProfileImg from "../ProfileImg";

export default ({ selectedUser }) => {
    const user = Meteor.user();
    return <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '1.5 1 0' }}>
            <ProfileImg userId={selectedUser._id} size={200}/>
            <div>
                {selectedUser.profile?.name}
            </div>
        </div>

        {/* Only authenticated user available */}
        <div style={{ flex: '1 1 0' }}>
            {user ?
                <>
                    <div>
                        <FaPhone />
                        {selectedUser.profile?.phoneNumber || '-'}
                    </div>
                    <div>
                        <AiFillMail />
                        {selectedUser.emails[0]?.address}
                    </div>
                </>
                : <div> Please Log in </div>
            }
        </div>
    </div>
}