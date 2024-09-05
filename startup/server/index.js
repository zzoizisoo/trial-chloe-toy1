import { Meteor } from 'meteor/meteor';
import '../common'
import '../../imports/api/chats/server/publications'
import '../../imports/api/users/server/publications'
import '../../imports/api/comments/server/publications'
import '../../imports/api/userFavorPosts/server/publications'


import { PostsCollection, SamplePosts } from '../../imports/api/posts/collection';

Meteor.startup(async () => {
  if(await PostsCollection.find().countAsync() === 0){ 
    SamplePosts.forEach((async p => await PostsCollection.insertAsync(p)))
  }  
});
