import { Meteor } from 'meteor/meteor';

import '../../imports/api/users/methods'
import '../../imports/api/chats/methods'
import '../../imports/api/posts/methods'
import '../../imports/api/comments/methods'


import '../../imports/api/chats/server/publications'
import '../../imports/api/users/server/publications'
import '../../imports/api/comments/server/publications'

import { PostsCollection, SamplePosts } from '../../imports/api/posts/collection';

Meteor.startup(async () => {
  if(await PostsCollection.find().countAsync() === 0){ 
    SamplePosts.forEach((async p => await PostsCollection.insertAsync(p)))
  }  
});
