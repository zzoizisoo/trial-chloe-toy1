import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const SEED_USERNAME = 'Chloe';
const SEED_PASSWORD = 'isdoinggreat';

Meteor.startup(async () => {
  

  // if (!Accounts.findUserByUsername(SEED_USERNAME)) {
  //   // ??? 안됨.
  //   Accounts.createUser({
  //     username: SEED_USERNAME,
  //     password: SEED_PASSWORD,
  //   });
  // }
});
