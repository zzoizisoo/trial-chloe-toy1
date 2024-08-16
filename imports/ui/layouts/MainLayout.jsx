import React from 'react'
import {Header} from '../components'

export const MainLayout = ({content}) =>{ 
    return <div>
        <Header /> 

        <main>
            {content}
        </main>
    </div>
}