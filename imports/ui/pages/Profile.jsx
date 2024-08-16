import { Button } from "@mui/joy";
import React from "react";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

export default () => { 

    const onLogout = () => { 
        Meteor.logout();
        FlowRouter.go('/')
    }

    return <><h1> Profile</h1>
    <Button onClick={onLogout}>Log out</Button>
    </>
}