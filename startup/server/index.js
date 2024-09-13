import { Meteor } from 'meteor/meteor';
import '../common'
import '../../imports/api/chats/server/publications'
import '../../imports/api/users/server/publications'
import '../../imports/api/comments/server/publications'
import '../../imports/api/userFavorPosts/server/publications'
import { createDumpPost, createDumpUser } from './fixtures';

Meteor.startup(async () => {
    // createDumpUser(300);
    // createDumpPost(300)
});
