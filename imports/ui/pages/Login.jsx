import { Meteor } from 'meteor/meteor';
import React, {useState} from "react";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Button } from "@mui/joy";


export default () => { 
    const [loginInfo, setLoginInfo] = useState({username: '', password:''})

    const handleChange = (e) =>{ 
        const {name, value} = e.target
        setLoginInfo({ ...loginInfo, [name]: value})

    }

    const handleSubmit = () =>{ 
        Meteor.loginWithPassword(
            loginInfo.username, 
            loginInfo.password,
            (err) => { 
                if(err)console.error(err)
                else FlowRouter.go('/')
            })
    }

    return <>
        <h1>Login</h1>

        <form>
            <div>
                <label htmlFor="username">Name or Email</label>
                <input name="username" type="text" required onChange={handleChange}/>
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" required onChange={handleChange}/> 
            </div>

            <Button onClick={() => FlowRouter.go('/')}> Cancel </Button>
            <Button onClick={handleSubmit} disabled={!loginInfo.username || !loginInfo.password}> OK </Button>
            <p>ok 버튼 누르기 말고 엔터도 submit 하고싶지만 일단 다음으로~~</p>
        </form>
    </>
}