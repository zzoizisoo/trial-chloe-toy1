import SimpleSchema from "meteor/aldeed:simple-schema";
import '../imports/api/users/methods'
import '../imports/api/chats/methods'
import '../imports/api/posts/methods'
import '../imports/api/comments/methods'
import '../imports/api/userFavorPosts/methods'


//CROSS-SCHEMA CONCERN. 어디둬야하지 🤔
SimpleSchema.defineValidationErrorTransform((error) => {
    const ddpError = new Meteor.Error(error.message);
    ddpError.error = "validation-error";
    ddpError.details = error.details;
    return ddpError;
  });

