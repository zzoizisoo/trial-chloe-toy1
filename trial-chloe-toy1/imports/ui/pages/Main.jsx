import React from 'react'
import Grid from '@mui/joy/Grid';


export default () => { 
    return <div>
        {/* TODO: 반응형-모바일에서는 d-none, 메뉴 hamberger든 뭐시기든. */}
        <div className='flex'>
            <div>
                USER LIST
            </div>

            <div>
                CLICKED USER INFO
            </div>

            <div>
                CHAT
            </div>
        </div>


        {/* Posts comes here... */}
        <div>
            POSTS
        </div>
    </div>
}