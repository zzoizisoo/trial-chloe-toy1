import { Meteor } from 'meteor/meteor';

import '../../imports/api/chats/server/publications'
import '../../imports/api/users/server/publications'

import { PostsCollection, SamplePosts } from '../../imports/api/posts/posts';

Meteor.startup(async () => {
  if(await PostsCollection.find().countAsync() === 0){ 
    SamplePosts.forEach((async p => await PostsCollection.insertAsync(p)))
  }  
});
