import { Meteor } from 'meteor/meteor';
import { PostsCollection, SamplePosts } from '../../imports/api/posts/posts';


Meteor.startup(async () => {
  if(await PostsCollection.find().countAsync() === 0){ 
    SamplePosts.forEach((async p => await PostsCollection.insertAsync(p)))
  }  
});
