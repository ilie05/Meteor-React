import {Meteor} from 'meteor/meteor'
import {Users} from '/db';
import UserService from '/imports/api/users/services/UserService'

Meteor.methods({
    'user.register' (data) {
        UserService.register(data);
    }
});