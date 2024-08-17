import React from "react"

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
                        <div>{selectedUser.profile?.phoneNumber}</div>
                        <div>{selectedUser.emails[0]?.address}  </div>
                    </>
                 : <> Please Log in </>
            }
        </div>
    </div>
}