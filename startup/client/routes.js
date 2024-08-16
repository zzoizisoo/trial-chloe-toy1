import React from 'react'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { mount } from 'react-mounter';
import { MainLayout } from '../../imports/ui/layouts/MainLayout';
import { SignUp, Login, Favorite, Main, PostWrite } from '../../imports/ui/pages'

// DISABLE QUERY STRING COMPATIBILITY
// WITH OLDER FlowRouter AND Meteor RELEASES
FlowRouter.decodeQueryParamsOnce = true;

FlowRouter.route('/', {
    name: 'index',
    action(){ 
        mount(MainLayout, {
            content: <Main />
        })
    }
})

FlowRouter.route('/login', { 
    name: 'login',
    action(){ 
        mount(MainLayout, {
            content: <Login/> 
        })
    }
})


FlowRouter.route('/signup', { 
    name: 'signup',
    action(){ 
        mount(MainLayout, {
            content: <SignUp/> 
        })
    }
})



const loggedIn = FlowRouter.group({
    name: 'loggedIn',
    triggersEnter: [(context, redirect) => { 
        if(!Meteor.user()){ 
            redirect('/login')    
        }      
    }]
})


// requires log in
// redirect user to sign up page when user status change
loggedIn.route('/post-write', { 
    name: 'post-write',
    action(){ 
        mount(MainLayout, {
            content: <PostWrite/> 
        })
    }
})

// requires log in
// redirect user to sign up page when user status change
loggedIn.route('/favorite/:uid', { 
    name: 'favorite',
    action({uid}){ 
        mount(MainLayout, {
            content: <Favorite/> 
        })
    }
})
