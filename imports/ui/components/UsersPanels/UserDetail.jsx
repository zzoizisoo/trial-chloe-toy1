import React from "react"
import { FaPhone } from "react-icons/fa6";
import { AiFillMail } from "react-icons/ai";

export default ({selectedUser}) =>{ 
    const user = Meteor.user();
    return <div> 
        <div>
            {selectedUser.profile?.profileImgUrl}  
            {selectedUser.profile?.name}  
        </div>

        {/* Only authenticated user available */}
        <div>
            {user ? 
                    <>
                        <div>
                            <FaPhone />
                            {selectedUser.profile?.phoneNumber || '-' }
                        </div>
                        <div>
                            <AiFillMail />
                            {selectedUser.emails[0]?.address}  
                        </div>
                    </>
                 : <> Please Log in </>
            }
        </div>
    </div>
}