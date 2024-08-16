import React from 'react'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { mount } from 'react-mounter';
import { MainLayout } from '../../imports/ui/layouts/MainLayout';
import { Favorite, Main, PostWrite } from '../../imports/ui/pages'

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


// requires log in
FlowRouter.route('/post-write', { 
    name: 'post-write',
    action(){ 
        mount(MainLayout, {
            content: <PostWrite/> 
        })
    }
})

// requires log in
FlowRouter.route('/favorite/:uid', { 
    name: 'post-write',
    action({uid}){ 
        mount(MainLayout, {
            content: <Favorite/> 
        })
    }
})