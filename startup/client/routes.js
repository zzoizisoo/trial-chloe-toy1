import React from 'react'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { mount } from 'react-mounter';
import { MainLayout, PostDetailLayout, SignUpLayout } from '../../imports/ui/layouts';
import { SignUp, Login, Favorite, Main, PostForm, Profile, Post} from '../../imports/ui/pages'

// TODO
// add undefined router ㅋㅋ

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
        mount(SignUpLayout, {
            content: <Login/> 
        })
    }
})

FlowRouter.route('/signup', { 
    name: 'signup',
    action(){ 
        mount(SignUpLayout, {
            content: <SignUp/> 
        })
    }
})



const loggedIn = FlowRouter.group({
    name: 'loggedIn',
    triggersEnter: [(context, redirect) => { 
        if(!Meteor.user() && !Meteor.loggingIn()){ 
            redirect('/login')    
        }      
    }]
})


// redirect user to login page when user status change
loggedIn.route('/post-write', { 
    name: 'post-write',
    action(){ 
        mount(MainLayout, {
            content: <PostForm/> 
        })
    }
})

loggedIn.route('/post/:pid/edit', { 
    name: 'post-edit',
    action({pid}){ 
        mount(MainLayout, {
            content: <PostForm postId={pid}/> 
        })
    }
})

// redirect user to login page when user status change
loggedIn.route('/favorite/:uid', { 
    name: 'favorite',
    action({uid}){ 
        mount(MainLayout, {
            content: <Favorite/> 
        })
    }
})

// redirect user to login page when user status change
loggedIn.route('/profile/:uid', { 
    name: 'profile',
    action({uid}){ 
        mount(SignUpLayout, {
            content: <Profile/> 
        })
    }
})

loggedIn.route('/post/:pid', { 
    name: 'post',
    action({pid}){ 
        mount(PostDetailLayout, {
            content: <Post postId={pid}/>
        })
    }
})